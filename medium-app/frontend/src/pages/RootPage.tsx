import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URI } from "../config";
import { Spinner } from "../components/Spinner";

export function RootPage(){

  const navigate = useNavigate();

  useEffect(()=>{

    const token = localStorage.getItem("token");
    console.log('hi');
    console.log(token);

    if (token == null){
      navigate("/signin");
    }

    axios.get(`${BACKEND_URI}/api/v1/user/me`,{
      headers: {
        Authorization: `Bearer ${token}` 
      }
    }).then(()=>{
      navigate("/blogs");
    }).catch(()=>{
      navigate("/signup");
    })

  },[]);


    return (
      <div className="flex justify-center h-screen bg-slate-200">
        <div className="flex items-center">
          <div className="font-bold text-3xl">
            <Spinner />
          </div>
        </div>
      </div>
    )
}