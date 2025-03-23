import { Hono, Context , Next } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { verify } from 'hono/jwt';
const blogRoute = new Hono();
import { UpdateBlog } from "../type/types";

//middleware
const jwtMiddleware = async (c:Context, next: Next) => {
  const authHeader = c.req.header('authorization') || ''
  const token = authHeader.split(' ')[1]
  
  if (!token) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  try {
    const payload = await verify(token, c.env.JWT_SECRET);
    c.set('jwtPayload', payload) 
    await next();
  } catch (err) {
    return c.json({ error: 'Invalid token' }, 403)
  }
}

// route to get array of blog
blogRoute.get('/bulk',async function(c:Context){

  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL
  }).$extends(withAccelerate());

  try {
    const blogs = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        created_at: true,
        author: {
          select: {
            name: true
          }
        }
      }
    });

    let size:number = blogs.length ;

    if (size === 0) {
      return c.json({message: "No Blog found"},404);
    }

    // function to reverse array
    let i = 0 , j = size - 1 ;    

    while(i < j){
      [blogs[i], blogs[j]] = [blogs[j], blogs[i]];
      i++;
      j--;
    }

    return c.json({message: "All Post fetched successfully", blogs},200);
  } catch (error) {
    return c.json({message: "Something error occurs"},500);
  }
})


// route for getting sepecific blog
blogRoute.get('/:id',async function(c:Context){

  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL
  }).$extends(withAccelerate());

  const blogId = c.req.param('id');

  try {
    const blog = await prisma.post.findUnique({ 
      where: { id: blogId },
      select: {
        id: true,
        title: true, 
        content: true,
        created_at: true,
        author: {
          select: {
            name: true
          }
        }
      }
    });
    if (blog === null){
      return c.json({message: "Blog not found"}, 404);
    }
    return c.json({ message : "Blog fetched Successfully!", blog}, 200);
  } catch (error) {
    return c.json({message: "Something error occurs"},500);
  }

})
blogRoute.use("/auth/*", jwtMiddleware);

// route to post a blog 
blogRoute.post('/auth/post',async function(c:Context){
  
  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL
  }).$extends(withAccelerate());

  const { title , content } = await c.req.json();
  const authorObject = c.get('jwtPayload');
  const authorId = authorObject.id;

  try {

    const addPost = await prisma.post.create({
      data: { title , content , authorId }
    });
    return c.json({message: "Post Added Successfully", addPost},201);

  } catch (error) {

    return c.json({message: "Something error occurs"},500);
  }

})

// route to update blog for given blogId
// blogRoute.put('/auth/update/:blogId',async function(c:Context){

//   const prisma = new PrismaClient({
//     datasourceUrl : c.env.DATABASE_URL
//   }).$extends(withAccelerate());

//   const { id } = c.get('jwtPayload');
//   const blogId = c.req.param('blogId');
//   const body:UpdateBlog = await c.req.json();

//   try {
//     const updateBlog = await prisma.post.update({
//       where: { id: blogId},
//       data: body
//     })
//     return c.json({message: "Blog Updated Successfully", updateBlog},200);
//   } catch (error) {
//     return c.json({message: "Something Error Occurs"},500);
//   }
// })

export default blogRoute;