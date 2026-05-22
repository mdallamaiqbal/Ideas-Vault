"use client";

import { authClient } from "@/lib/auth-client";
import {Button, Card, Description, FieldError, Form, Input, Label, TextField} from "@heroui/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";


const LoginPage = () => {
    const onSubmit = async(e)=>{
    e.preventDefault()
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());
    const {data,error}= await authClient.signIn.email({
        email:user.email,
        password:user.password,
    })
     if(data){
            redirect('/')
        }
        if(error){
            toast.error('error')
        }
    }
    const handleGoogleSignin=async()=>{
  await authClient.signIn.social({
    provider:"google"
  })
}
    return (
    <div className="max-w-7xl mx-auto mt-10 md:mt-20">
     <Card>
      <h2 className="text-center font-semibold text-2xl my-5">Please Login</h2>
      <Form onSubmit={onSubmit} className="flex w-96 flex-col gap-4" >
      <TextField
        isRequired
        name="email"
        type="email"
        validate={(value) => {
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
            return "Please enter a valid email address";
          }
          return null;
        }}
      >
        <Label>Email</Label>
        <Input placeholder="john@example.com" />
        <FieldError />
      </TextField>
      <TextField
        isRequired
        minLength={8}
        name="password"
        type="password"
        validate={(value) => {
          if (value.length < 8) {
            return "Password must be at least 8 characters";
          }
          if (!/[A-Z]/.test(value)) {
            return "Password must contain at least one uppercase letter";
          }
          if (!/[0-9]/.test(value)) {
            return "Password must contain at least one number";
          }
          return null;
        }}
      >
        <Label>Password</Label>
        <Input placeholder="Enter your password" />
        <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
        <FieldError />
      </TextField>
      <div>
        <Button className={"w-full bg-blue-600 rounded-lg text-xl"} type="submit">
          Login
        </Button>
      </div>
       </Form>
         <div className="flex gap-2 justify-center">
            <p className="text-muted">Register new account </p>
            <Link  href={'/register'} className="hover:text-blue-600 font-semibold">Register</Link>
         </div>
         <Button onClick={handleGoogleSignin} variant="outline" className={' rounded-none w-full'}> Google connect</Button>
          </Card>
        </div>
    );
};

export default LoginPage;