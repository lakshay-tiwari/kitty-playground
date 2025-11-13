import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addTodo } from "./features/todoStorefunc";
import { TodoList } from "./components/TodoList";

let todoCounter = 0 ;
function App() {
    const dispatch = useDispatch();
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = (data:any)=>{
      data.id = todoCounter 
      data.isCompleted = false
      dispatch(addTodo(data));
      todoCounter = todoCounter + 1 ;
      reset();
    }
  return (
    <div>
      <div className="flex justify-center ">
        <div>
          <div className="flex justify-center mt-4">
            <h1 className="font-bold">Todo Manager</h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="m-4">
              <label className="font-bold">Title</label>
              <input
                
                placeholder="Enter Title"
                className="border-2 rounded mx-4 px-1"
                {...register("title", { required: true})}
              />
            </div>
            <div className="m-4">
              <label className="font-bold">Description</label>
              <input
               
                placeholder="Enter Description"
                className="border-2 rounded mx-4 px-1"
                {...register("description", { required: true})}
              />
            </div>
            <div className="flex justify-center">
              <span className="m-4 border-2 px-2">
                <button className="font-bold" type="submit">
                  Add Todo
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <TodoList />
      </div>
    </div>
  )
}

export default App
