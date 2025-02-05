import { z } from "zod";


const msg1 = "Length of username is between 3 to 10";
const msg2 = "Length of password is between 6 to 15";

export const addUser = z.object({
  username : z.string().min(3, {message: msg1}).max(10, {message: msg1}),
  password : z.string().min(6, {message: msg2}).max(15, {message: msg2})
})

export const updateUser = z.string().min(6, {message: msg2}).max(15, {message: msg2}); // update only password

export const userId = z.number(); // you can use this for anything who use integer

export const addTodo = z.object({
  title: z.string(),
  description: z.string(),
  userId : z.number()
})


export const updateTodo = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  done: z.boolean().optional()
})