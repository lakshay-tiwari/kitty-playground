import { useDispatch, useSelector } from "react-redux"
import { changeStatus, removeTodo, type TodoInterface , updateTodo } from "../features/todoStorefunc";
import { useState } from "react";


export const TodoList = ()=>{
    const [showPopup, setPopup] = useState<Boolean>(false)
    const todos = useSelector((state: any) => state.todo)

    // check is array or not because persist take time
    if (!Array.isArray(todos)) return null
    const [editingTodo, setEditingTodo] = useState<TodoInterface | null>(null)
    const [title,setTitle] = useState<string>('')
    const [description,setDescription] = useState<string>('')

    const dispatch = useDispatch();

    function togglePopup(){
        setPopup(!showPopup)
    }

    return <div className="border-2 px-72 pb-4 relative">
        {todos.map((todo: TodoInterface) => {
            return <div key={todo.id} className="mt-4">
                <div>
                    <span className="font-bold px-2">Title: </span>
                    <span>{todo.title}</span>
                </div>
                <div>
                    <span className="font-bold px-2">Description: </span>
                    <span>{todo.description}</span>
                </div>
                <div>
                    <span className="font-bold px-2">Status: </span>
                    <span>{todo.isCompleted ? "Completed" : "Not Complete"}</span>
                </div>
                <div className=" border-2 p-1 rounded-md mt-2  w-full">
                    <button className="w-full h-full cursor-pointer"
                        onClick={()=>{
                            dispatch(changeStatus(todo));
                        }}
                    >
                        Mark
                    </button>
                </div>
                <div className="mt-4 border-2 p-1 rounded-md w-full">
                    <button className="w-full cursor-pointer h-full"
                        onClick={()=> {
                            dispatch(removeTodo(todo));
                        }}
                        >
                        Delete
                    </button>
                </div>

                <div className="mt-4 border-2 p-1 rounded-md w-full">
                    <button className="w-full cursor-pointer h-full px-3"
                        onClick={()=>{
                            setTitle(todo.title)
                            setDescription(todo.description)
                            setEditingTodo(todo)
                            togglePopup()
                        }}
                        >Update Todo
                    </button>
                </div>

            </div>
        })}
            {showPopup && (
                    <div className="absolute inset-0 bg-slate-200 bg-opacity-50 flex justify-center items-center">
                        <div>
                            <div>
                                <div className="mb-2">
                                    <label className="font-semibold">Enter title: </label>
                                    <input
                                        placeholder="Title"
                                        className="border-2 px-2 py-1"
                                        value={title}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{
                                            setTitle(e.target.value)
                                        }}
                                    />
                                </div>
                                <div className="mb-2">
                                     <label className="font-semibold">Enter Description: </label>
                                    <input
                                        placeholder="Description"
                                        className="border-2 px-2 py-1"
                                        value={description}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{
                                            setDescription(e.target.value)
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="border-2 w-40 mx-auto p-2 cursor-pointer hover:bg-slate-100 flex justify-center rounded-2xl mt-6">
                                <button onClick={()=>{
                                    if (!editingTodo) return;

                                    const updatedTodo = {
                                        ...editingTodo,
                                        title,
                                        description
                                    }
                                    dispatch(updateTodo(updatedTodo))
                                    setTitle('')
                                    setDescription('')
                                    setEditingTodo(null)
                                    togglePopup();
                                }}
                                    className="w-full h-full"    
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
            )}
    </div>
}