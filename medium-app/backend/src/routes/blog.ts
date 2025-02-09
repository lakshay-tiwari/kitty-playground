import { Hono, Context } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

// const prisma = new PrismaClient({
//   // @ts-ignore
//   datasourceUrl: env.DATABASE_URL
// }).$extends(withAccelerate())

const blogRoute = new Hono();

blogRoute.get('/:id', function(c:Context){
  return c.text('blog');
})

blogRoute.get('/bulk',function(c:Context){
  return c.text('bulk');
})

blogRoute.put('/', function(c:Context){
  return c.text('blog update');
})

blogRoute.post('/', function(c:Context){
  return c.text('blog post');
})


export default blogRoute;