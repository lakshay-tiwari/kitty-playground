import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupInput, LabelledInputType } from "../types";
import { BACKEND_URI } from "../config";
import axios from "axios";

export function Auth({ type }:{type: "signin" | "signup"}){
  const navigate = useNavigate() ;
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    email: "",
    password: ""
});

async function sendRequest() {
  try {
      const response = await axios.post(`${BACKEND_URI}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
  } catch(e) {
      alert("Error while signing up")
      // alert the user here that the request failed
  }
}

  return <div className="h-screen flex justify-center">
    <div className="flex items-center">
      <div>
        <div className="px-10">
          <div className="text-3xl font-extrabold">
            Create an Account
          </div>
          <div className="text-center pt-1 text-slate-500">
            {type==="signup"?"Already have an account?":"Don't have an account" }   
            <Link className="underline ml-2" to={type==="signup"?"/signin":"/signup"}>
              {type==="signin"?"Sign up":"Sign in"}
            </Link></div>
        </div>

        <div>
            {type==="signup"?
              <LabelledInput label="Username" placeholder="Enter your username" onChange={(e)=>{
                setPostInputs(prev => ({ ...prev, name: e.target.value }));
              }}/> : null
            }

            <LabelledInput label="Email" placeholder="Enter your email" onChange={(e)=>{
              setPostInputs(prev => ({ ...prev, email: e.target.value }));
            }}/>

            <LabelledInput label="Password" type="password" placeholder="Enter your password" onChange={(e)=>{
              setPostInputs({
                ...postInputs, 
                password: e.target.value
              })
            }}/>

            <button type="button" onClick={sendRequest} className="cursor-pointer w-full mt-8 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
              {type === "signin" ? "Sign in" : "Signup"}
            </button>
          </div>
      </div>
    </div>
  </div>
}

function LabelledInput({ label, placeholder, onChange , type }: LabelledInputType) {
  return <div>
      <label className="block mb-2 text-md text-black font-semibold pt-4">{label}</label>
      <input type={ type || "text" } onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
  </div>
}