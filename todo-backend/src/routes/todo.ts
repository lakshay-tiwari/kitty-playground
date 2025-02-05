import { Request , Response, Router } from "express";
import { addTodo , updateTodo, userId } from "../zod-schema/schema";
import { addTodoByUser, deleteTodoByUser, getTodoByid, updateTodoByUser } from "../db";

const router = Router();

enum statusCode {
  allgood = 200,
  notPresent = 404,
  failure = 500,
  invalidInput = 400,
  conflict = 409
}

interface Todo {
  id: number,
  title: string,
  description: string,
  done: boolean,
  userId: number
}

// eg. /todo/2  (get request , give userId)
router.get('/:userid' ,async (req: Request , res: Response):Promise<void>=>{
  const userid:number = parseInt(req.params.userid);
  const { success } = userId.safeParse(userid);

  if (!success){
    res.status(statusCode.invalidInput).json({message: "invalid inputs"});
    return;
  }

  const todos = await getTodoByid(userid);
  if (todos?.length == 0 || todos == undefined){
    res.status(statusCode.notPresent).json({message: "Something wrong"});
  }
  res.status(statusCode.allgood).json({
    todos
  })
  return;
})



interface Todos{
  title: string,
  description: string,
  userId: number
}

// eg. /todo/add  , body: Todos , (post request)
router.post('/add' ,async (req: Request , res: Response):Promise<void>=>{
  const body:Todos = req.body;
  const {success} = addTodo.safeParse(body);
  if (!success){
    res.status(statusCode.invalidInput).json({message:"invalid inputs"});
    return;
  }
  const add_Todo = await addTodoByUser(body);
  if (add_Todo == null) {
    res.status(statusCode.notPresent).json({message: "Todo not added"});
    return;
  }
  res.status(statusCode.allgood).json({add_Todo, message: "todo added!"});
})

interface updateTodo{
  title? : string,
  description?: string,
  done?: boolean
}


// eg. /todo/update/1   (put request , give todo Id not userId)
router.put('/update/:id' ,async (req: Request , res: Response):Promise<void>=>{
  const body:updateTodo = req.body;
  const id:number = parseInt(req.params.id);
  const parseTodo = updateTodo.safeParse(body);
  const parseId = userId.safeParse(id);
  if (!parseId.success || !parseTodo.success){
    res.status(statusCode.invalidInput).json({message: "invalid inputs"});
    return;
  }
  const update_todo = await updateTodoByUser(body ,id);
  if (update_todo == null){
    res.status(statusCode.notPresent).json({message: "todo not"});
    return;
  }
  res.status(statusCode.allgood).json({update_todo , message: "todo updated successfully!"});
  return;
})


// eg. /todo/delete/2 (delete request) 
router.delete('/delete/:todoId' ,async (req: Request , res: Response):Promise<void>=>{
  const todoId: number = parseInt(req.params.todoId);
  const { success } = userId.safeParse(todoId);
  if(!success){
    res.status(statusCode.invalidInput).json({message: "invalid inputs"});
    return;
  }
  const delete_todo = await deleteTodoByUser(todoId);
  res.status(statusCode.allgood).json({message: delete_todo});
  return;
})

export default router ;