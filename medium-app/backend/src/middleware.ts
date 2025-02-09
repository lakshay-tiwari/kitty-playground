import { Context } from 'hono';
import { jwt } from 'hono/jwt'

export async function jwtVerify(c:Context,next:Promise<void>){
  const JWT_SECRET = 
}