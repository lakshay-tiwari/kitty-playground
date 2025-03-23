import { Circle } from "./BlogCard"


export const BlogSkeleton = ()=>{
  return <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md animate-pulse">
    <div className="flex pt-2">
      <div className="h-5 w-5 bg-gray-200 rounded-full mb-4"></div>
      <div className="flex items-center">
        <div className="h-2 w-20 ml-1 bg-gray-200 rounded-full mb-2.5"></div>
      </div>
      <div className="flex flex-col justify-center pl-2 pb-2">
         < Circle />
       </div>
       <div className="flex items-center">
        <div className="h-2 w-20 ml-1 bg-gray-200 rounded-full mb-2.5"></div>
      </div>
    </div>
    <div className="pr-40">
      <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
    </div>
  </div>
}



