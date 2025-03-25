import { Hono, Context } from "hono";
import { sign , verify } from 'hono/jwt';
import { Signup , Signin, UpdateUser } from "../type/types";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { z } from "zod";
const userRoute = new Hono();

const signupSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string()
})

const signinSchema = z.object({
  email: z.string(),
  password: z.string()
})

// signup route
userRoute.post('/signup',async function(c:Context){

  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL
  }).$extends(withAccelerate());
  
  const body: Signup = await c.req.json();

  const { success } = signupSchema.safeParse(body);

  if (!success){
    return c.json({message: "Invalid"}, 401);
  }

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

  const { success } = signinSchema.safeParse(body);

  if (!success){
    return c.json({message: "Invalid"}, 401);
  }

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


// route to know isLogged by jwt
userRoute.get('/me', async function(c:Context) {
  console.log('hi')
  const token: string =  await c.req.header('Authorization') || "";
  const jwtToken:string = (token.split(' ').length == 2)? token.split(' ')[1] : "" ;
  
  try {
    const decode = await verify(jwtToken , c.env.JWT_SECRET);
    return c.json({'isLogged': true }, 201);
  } catch (error) {
    return c.json({'isLogged': false}, 404);
  }
  
})


//update password or name
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

    c.status(200);
    return c.json({message: "User updated Successfully"});
  } catch (error) {
    c.status(500);
    return c.json({message: "Something Error Occurs"});
  }
})

export default userRoute;