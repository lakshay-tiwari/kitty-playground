import { Link } from "react-router-dom"

export default function(){
  return <div className="border-b flex justify-between px-10 py-4">
      <Link to={"/blogs"} className="flex font-bold text-xl justify-center flex-col cursor-pointer">
          Medium
      </Link>
    <div>
      <div className="flex">
        <Link to={`/publish`}>
                <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer ">New</button>
        </Link>
        <Avatar name={"Lakshya"}/>
      </div>
    </div>
  </div>
}

function Avatar({name}: {name:string}){
  return (
    <div className={"rounded-full h-10 w-10 bg-slate-300 flex justify-center cursor-pointer"}>
      <div className="flex items-center font-medium">
        {name[0]}
      </div>
    </div>
  )
}