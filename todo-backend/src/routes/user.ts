import { Request , Response, Router } from "express";
import { addUser, updateUser, userId } from "../zod-schema/schema";
import { addUserinDB, deleteUserByid, getUserByid, updateUserByid , } from "../db";

const router = Router();

enum statusCode {
  allgood = 200,
  notPresent = 404,
  failure = 500,
  invalidInput = 400,
  conflict = 409
}

// eg. reqUrl = /user/12  (get request)
router.get('/:id',async function(req:Request , res: Response):Promise<void>{  // to get user information
  const id = parseInt(req.params.id);
  const { success } = userId.safeParse(id);
  if (!success){
    res.status(statusCode.invalidInput).json({message: "id provided is not integer"});
    return;
  }
  const user = await getUserByid(id);
  if (user == null){
    res.status(statusCode.conflict).json({message: "some error"});
    return;
  }
  res.status(statusCode.allgood).json(user);
  return ;
})

interface User{
  username: string,
  password: string
}

// eg. reqUrl = /user/add , body: User , (post request)
router.post('/add',async function(req:Request , res: Response):Promise<void>{  // to get user information
  const body:User = req.body ;
  const { success } = addUser.safeParse(body);
  if (!success){
    res.status(statusCode.invalidInput).json({message: "Invalid Inputs"});
    console.log('there');
    return;
  }
  const addValue = await addUserinDB(body);
  if (addValue == null) {
    res.status(statusCode.conflict).json({message: "Not added in db or already present"});
    return;
  }

  res.status(statusCode.allgood).json({
    addValue
  });
  return;
})


// eg./user/update/12/?password=hithere  (put request) 
router.put('/update/:id',async function(req:Request , res: Response):Promise<void>{  // to get user information
  const id = parseInt(req.params.id);
  const password:string = req.query.password as string;
  const { success } = updateUser.safeParse(password);
  if (!success){
    res.status(statusCode.invalidInput).json({message: "not valid password"});
    return;
  }
  const user = await updateUserByid(id, password);
  if (user == null){
    res.status(statusCode.notPresent).json({message: "not updated or wrong password"});
    return;
  }
  res.status(statusCode.allgood).json({message: "updated successfully!"});
  return;
})


// eg. /user/delete/12    (delete request)
router.delete('/delete/:id',async function(req:Request , res: Response):Promise<void>{  // to get user information
  const id = parseInt(req.params.id);
  const delquery = await deleteUserByid(id);
  res.json({message: delquery});
  return;
})

export default router ;