import BlogCard from "../components/BlogCard";
import AppBar from "../components/AppBar";
import { useBlogs } from "../hooks";
import { BlogSkeleton } from "../components/BlogSkeleton";

export function Blogs(){
  
  const {loading, blogs , message } = useBlogs();

  if (loading == true || false){
    return (
      <div>
        <AppBar />    
        <div className="flex justify-center">
          <div>
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </div>
        </div>
      </div>
    )
  }

  if (message != "" && loading == false){
    return <div className="h-screen flex flex-col">
    <div>
      <AppBar />
    </div>
    <div className="flex-1 flex justify-center items-center">
      <div className="text-4xl text-blue-800 font-extrabold">
        Whoops! {message}
      </div>
    </div>
  </div>
  }

  return(
  <div className="h-screen">
    <AppBar />
    <div className="flex justify-center">
      <div>
        {blogs.map(blog => <BlogCard
            id={blog.id}
            authorName={blog.author.name || "Anonymous"}
            title={blog.title}
            content={blog.content} 
            created_at={blog.created_at.toString()} />
        )}
      </div>
  
    </div>

  </div>)
}




