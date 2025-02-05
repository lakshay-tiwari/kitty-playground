import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const getUserByid = async(id: number)=>{
  try {
    const user = await prisma.user.findUnique({
      where: {id}
    })
    return user; 
  } catch (error) {
    console.log(error);
    return;
  }
}

interface User{
  username: string,
  password : string
}

export const addUserinDB = async(user:User)=>{
  try {
    // check user exist or not
    const checkUser = await prisma.user.findUnique({
      where: {
        username: user.username
      }
    })
    if (checkUser){
      return;
    }
    // add user to db
    const res = await prisma.user.create({
      data: user 
    })
    return res ;
  } catch (error) {
    console.log(error);
    return ;
  }
}

export const updateUserByid = async(id: number,newPassword: string)=>{
  try {
    const res = await prisma.user.update({
      where: {
        id
      },
      data: {
        password : newPassword
      }
    })
    return res;
  } catch (error) {
    console.log(error);
    return;
  }
}

export const deleteUserByid = async(id: number)=>{
  try {
    await prisma.user.delete({
      where: {
        id
      }
    });
    return 'Successfully Deleted'
  } catch (error) {
    console.log(error);
    return 'Unsuccessfully Deleted';
  }
}

export const getTodoByid = async(userId: number)=>{
  try {
    const res = await prisma.todo.findMany({
      where: {
        userId
      }
    })
    return res;
  } catch (error) {
    console.log("error while fetching", error);
    return;
  }
}


interface Addtodo{
  userId: number , 
  title: string ,
  description: string
}
export const addTodoByUser = async(todo:Addtodo)=>{
  try {
    const res = await prisma.todo.create({
      data: todo
    })
    return res;
  } catch (error) {
    console.log(error);
    return;
  }
}

interface UpdateUser {
  title?: string,
  description?: string
  done?: boolean
}

export const updateTodoByUser = async(todo:UpdateUser, id: number)=>{
  try {
    const updatedTodo:UpdateUser = {};

    if (todo.title){
      updatedTodo.title = todo.title
    }
    if (todo.description){
      updatedTodo.description = todo.description
    }
    if (todo.done){
      updatedTodo.done = todo.done
    }

    const res = await prisma.todo.update({
      where: {
        id
      },
      data: updatedTodo
    })

    return res;

  } catch (error) {
    console.log('some error while updating');
    console.log(error);
    return;
  }
}

export const deleteTodoByUser = async(id:number)=>{
  try {
    await prisma.todo.delete({
      where: {
        id
      }
    })
    return "Todo Deleted Successfully"
  } catch (error) {
    console.log("Problem in deleting!");
    console.log(error);
    return "Todo not deleted";
  }
}
