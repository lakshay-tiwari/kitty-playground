import { useEffect, useState } from "react"
import axios from "axios";
import { BACKEND_URI } from "../config";

export interface Blog{
  id: string,
  title: string, 
  content: string,
  author: {
    name: string
  }
  created_at: Date
}

export const useBlogs = ()=>{
  
  const [loading,setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [message, setMessage] = useState("");

  useEffect(()=>{
    axios.get(`${BACKEND_URI}/api/v1/blog/bulk`)
        .then((res) => {
          setBlogs(res.data.blogs);
          setLoading(false);
        })
        .catch((err)=>{
          setLoading(false);
          setMessage(err.response.data.message);
        });
  },[])

  return {
    loading,
    blogs,
    message
  }
}


export const useBlogId = ({id}: {id:string})=>{
  const [loading,setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();
  const [message , setMessage] = useState("");

  useEffect(()=>{
    axios.get(`${BACKEND_URI}/api/v1/blog/${id}`)
     .then((res)=>{
      setBlog(res.data.blog);
      setLoading(false);
     })
      .catch(err => {
        setMessage(err.response.data.message);
        setLoading(false);
      })
  },[id])

  return {
    loading,
    blog, 
    message
  }
};



/* 
  If you want to write async-await syntax in useEffect then write this
        async function fetchBlogs(setBlogs:any){
        try{
          const res = await axios.get(`${BACKEND_URI}/api/v1/blog/bulk`);
          console.log('Blog is ' + res);
          setBlogs(res.data);
        }
        catch(err){ 
          // @ts-ignore
          console.log(err.response.data.message);
        }
        return;
        }
*/