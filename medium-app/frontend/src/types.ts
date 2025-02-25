import { ChangeEvent } from "react";

export interface LabelledInputType{
  label: string,
  placeholder: string, 
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  type?: string
}

export interface SignupInput{
  email: string,
  password: string,
  name: string
}