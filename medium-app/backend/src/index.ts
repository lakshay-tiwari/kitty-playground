import { Hono , Context } from "hono";
import { cors } from 'hono/cors';
import userRoute from "./routes/user";
import blogRoute from "./routes/blog";
import { EnvBindings } from "./type/types";
const app = new Hono<{Bindings: EnvBindings}>();

app.use(cors());

app.route('/api/v1/user',userRoute);
app.route('/api/v1/blog',blogRoute);

app.get('/', (c:Context)=>{
  return c.text('hi');
})

export default app;