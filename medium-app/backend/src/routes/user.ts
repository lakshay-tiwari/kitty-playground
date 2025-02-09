import { Hono, Context } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign } from 'hono/jwt';
import { Signup , EnvBindings , Signin, UpdateUser } from "../type/types";

const userRoute = new Hono<{ Bindings: EnvBindings }>();


// signup route
userRoute.post('/signup',async function(c:Context){
  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL
  }).$extends(withAccelerate());
  
  const body: Signup = await c.req.json();

  try{

    const findUser = await prisma.user.findUnique({
      where: {
        email: body.email
      }
    });

    if (findUser){
      c.status(409);
      return c.json({msg: "Already have an account"});
    }

    const addUser = await prisma.user.create({
      data: body 
    })

    if (!addUser.id){
      throw new Error;
    }

    const id = addUser.id;
    const JWT_SECRET = c.env.JWT_SECRET;
    const token = await sign({id}, JWT_SECRET);

    c.status(201);
    return c.json({msg: "User Added" , token});
  }catch(error){
    console.log(error);
    c.status(500);
    return c.json({msg: "User not added"});
  }

})



// signin route
userRoute.post('/signin',async function(c:Context){

  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL
  }).$extends(withAccelerate());

  const body:Signin = await c.req.json();
  try {
    const findUser = await prisma.user.findUnique({
      where: {
        email: body.email
      }
    });

    if (!findUser){
      c.status(404);
      return c.json({message: "User not found"});
    }

    if (findUser.password !== body.password){
      c.status(401);
      return c.json({message: "Wrong Pasword"});
    }

    const id = findUser.id;
    const JWT_SECRET = c.env.JWT_SECRET;
    const token = await sign({id},JWT_SECRET);

    c.status(200)
    return c.json({message:"Signin successfully" , token});
    
  } catch (error) {
    c.status(500);
    return c.json({message: "Something Error Occurs"});
  }
})


//update password and name
userRoute.put('/update/:id', async function(c:Context){
  
  const userId = c.req.param('id')
  const body:UpdateUser = await c.req.json();

  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL
  }).$extends(withAccelerate());

  try {
    const findUser = await prisma.user.findUnique({
      where: {
        id: userId
      }
    })

    if (!findUser){
      c.status(404);
      return c.json({message: "User not found"});
    }

    const updateUser = await prisma.user.update({
      where: { id: findUser.id}, 
      data : body
    })
  } catch (error) {
    c.status(500);
    return c.json({message: "Something Error Occurs"});
  }
})

export default userRoute;