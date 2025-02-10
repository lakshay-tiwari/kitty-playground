import { Hono , Context } from "hono";
import { cors } from 'hono/cors';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import userRoute from "./routes/user";
import blogRoute from "./routes/blog";
import { EnvBindings } from "./type/types";
import { Prisma } from "./type/types";

const app = new Hono<{ Bindings: EnvBindings, Variables :Prisma }>();

app.use(cors());

app.route('/api/v1/user',userRoute);
app.route('/api/v1/blog',blogRoute);

app.get('/', (c:Context)=>{
  return c.text('hi');
})

export default app;