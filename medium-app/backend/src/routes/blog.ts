import { Hono, Context } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { UpdateBlog } from "../type/types";

const blogRoute = new Hono();


// route for getting sepecific blog
blogRoute.get('/:id',async function(c:Context){

  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL
  }).$extends(withAccelerate());

  const blogId = c.req.param('id');

  try {
    const blog = await prisma.post.findUnique({ where: {id: blogId } });
    if (blog === null){
      c.status(404);
      return c.json({message: "Blog not found"});
    }
    c.status(200);
    return c.json({ message : "Blog fetched Successfully!", blog});
  } catch (error) {
    c.status(500);
    return c.json({message: "Something error occurs"});
  }

})

// route to get array of blog
blogRoute.get('/bulk',async function(c:Context){

  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL
  }).$extends(withAccelerate());

  try {
    const blogList = await prisma.post.findMany();
    if (blogList.length === 0) {
      c.status(404);
      return c.json({message: "No Blog found"});
    }
    c.status(200);
    return c.json({message: "All Post fetched successfully", blogList});
  } catch (error) {
    c.status(500);
    return c.json({message: "Something error occurs"});
  }
})

// route to update blog for given blogId
blogRoute.put('/update/:blogId',async function(c:Context){

  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL
  }).$extends(withAccelerate());

  const authorId = c.get('userId');
  const blogId = c.req.param('blogId');
  const body:UpdateBlog = await c.req.json();

  try {
    const updateBlog = await prisma.post.update({
      where: { id: blogId},
      data: body
    })
    c.status(200);
    return c.json({message: "Blog Updated Successfully", updateBlog});
  } catch (error) {
    c.status(500);
    return c.json({message: "Something Error Occurs"});
  }
})


// route to post a blog 
blogRoute.post('/post',async function(c:Context){

  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL
  }).$extends(withAccelerate()); 

  const { title , content } = await c.req.json();
  const authorId = c.get('userId');
  try {
    const addPost = await prisma.post.create({
      data: { title , content , authorId }
    });
    c.status(201);
    return c.json({message: "Post Added Successfully", addPost});
  } catch (error) {
    c.status(500);
    return c.json({message: "Something error occurs"});
  }
})


export default blogRoute;