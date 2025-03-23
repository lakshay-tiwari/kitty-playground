import { useNavigate } from "react-router-dom"

interface BlogCardProps{
  id?: string,
  title: string,
  content: string,
  authorName: string,
  created_at: string
}

export default function BlogCard({id,title, content, authorName,created_at}:BlogCardProps){
  const navigate = useNavigate();
  return <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer" 
          onClick={()=> {
            navigate(`/blog/${id}`);
          }}
  >
    <div className="flex pt-2">
      <Avatar authorName={authorName.toUpperCase()}/>
      <div className="font-light pl-2 text-sm flex justify-center flex-col" >{authorName}</div>
      <div className="flex justify-center flex-col pl-2"> <Circle /> </div>
      <div className="pl-2 font-thin text-slate-700 text-sm flex justify-center flex-col">{created_at}</div>
    </div>
    <div className="pr-40">
      <div className="text-xl font-semibold pt-2">{title}</div>
      <div className="text-md font-light">{(content.length > 100)? content.slice(0, 100) + " ...":content}</div>
    </div>
    <div className="text-slate-500 text-sm font-thin pt-4">
      {`${Math.ceil(content.length / 100)} minute(s) read`}
    </div>
  </div>
}

export function Circle(){
  return <div className="rounded-full bg-slate-500 h-1 w-1">
  </div>
}

export function Avatar({authorName}:{authorName:string}){
  return(
      <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <span className="font-md text-gray-600 dark:text-gray-300">{authorName[0]}</span>
      </div>
  )
}