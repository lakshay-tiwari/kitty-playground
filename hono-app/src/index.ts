import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { env } from 'hono/adapter'
const app = new Hono();

interface Body{
  username: string
}
app.post('/', async (c) => {
  const body: Body = await c.req.json();
  const username:string = body.username;
  const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c)

  console.log(DATABASE_URL);
  const prisma = new PrismaClient({
      datasourceUrl: DATABASE_URL,
  }).$extends(withAccelerate())

  console.log(username);

  const result = await prisma.user.create({
    data: {
      username: username
    }
  })
  
  return c.json({result});
})

export default app
