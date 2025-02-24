import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";

interface postInputType{
  username: string,
  password: string,
  name: string
}


export function Auth({ type }:{type: "signin" | "signup"}){

  const [ postInputs,setPostInputs ] = useState<postInputType>({
    username: "",
    password: "",
    name: ""
  })

  return <div className="h-screen flex justify-center">
    <div className="flex items-center">
      <div>
        <div className="text-3xl font-extrabold">Create an Account</div>
        <div className="text-center pt-1 text-slate-500">Already have an account? <Link className="underline" to={"/signin"}>Login</Link></div>
        <LabelledInput label="Username" placeholder="Enter your username" onChange={(e)=>{}}/>
        <LabelledInput label="Emai" placeholder="Enter your email" onChange={(e)=>{}}/>
        <LabelledInput label="Password" placeholder="Enter your password" onChange={(e)=>{}}/>
      </div>
    </div>
  </div>
}

interface LabelledInputType{
  label: string,
  placeholder: string, 
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

function LabelledInput({ label, placeholder, onChange }: LabelledInputType) {
  return <div>
      <label className="block mb-2 text-md text-black font-semibold pt-4">{label}</label>
      <input onChange={onChange} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
  </div>
}