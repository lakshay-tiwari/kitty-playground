import { Hono , Context } from "hono";
import { cors } from 'hono/cors';
import { PrismaClient } from '@prisma/client/edge';
import userRoute from "./routes/user";
import blogRoute from "./routes/blog";
import { withAccelerate } from '@prisma/extension-accelerate';
import { EnvBindings } from "./type/types";
import { Prisma } from "./type/types";

const app = new Hono<{ Bindings: EnvBindings, Variables :Prisma }>();

app.use(cors());

app.use('/api/*', async function(c:Context){

  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL
  }).$extends(withAccelerate());
  c.set('prisma', prisma);

})


app.route('/api/v1/user',userRoute);
app.route('/api/v1/blog',blogRoute);

app.get('/', (c:Context)=>{
  return c.text('hi');
})

export default app;