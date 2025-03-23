import { Blog } from "../hooks"
import AppBar from "./AppBar"
import { Avatar } from "./BlogCard"

export const FullBlog = ({blog} : { blog: Blog })=>{
  return (
    <div>
      < AppBar />
      <div className="flex justify-center">
        <div className="grid grid-cols-12 w-full px-10 pt-20 max-w-screen-xl">
          <div className="col-span-8">
            <div className="font-bold text-4xl">
              {blog.title}
            </div>
            <div className="text-slate-500 pt-2">
              {blog.created_at.toString()}
            </div>
            <div className="pt-4 text-lg">
              {blog.content}
            </div>
          </div>
          <div className="col-span-4 ml-4">
            <div className="text-slate-600 text-lg">
              Author
            </div>
            <div className="flex">
              <div className="pr-4 flex flex-col justify-center">
                < Avatar authorName={blog.author.name.toUpperCase() || "Anonymous"}/>
              </div>
              <div className="text-xl font-bold">
                {blog.author.name || "Anonymous"}
              </div>
            </div>
            <div className="pt-2 text-slate-500">
              Random catch phrase about the author's ability to grab the user's attention
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}