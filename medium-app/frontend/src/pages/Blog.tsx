import { useParams } from "react-router-dom";
import { FullBlog } from "../components/FullBlog";
import { useBlogId } from "../hooks";
import { Spinner } from "../components/Spinner";


export function Blog(){

  const { id }= useParams();

  const { loading, blog, message } = useBlogId({
    id: id || ""
  })


  if (loading || !blog ){ // blog might be undefined do this else you can do this blog == undefined    
    return <div>
     <Spinner />
    </div>
  }

  if ( message === ("Blog not found" || "Something error occurs") && !loading){
    return <div>
      { message }
    </div>
  }

  return (
    <div>
      <FullBlog blog={blog} />
    </div>
  )
}