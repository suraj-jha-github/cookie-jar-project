import React, { useEffect, useState } from "react";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from "react-router-dom";
import * as z from "zod";
import  useStore  from "../../store/index.js";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { SocialAuth } from "../../components/ui/scial-auth.jsx";
import { Separator } from "../../components/separator.jsx";
import Input from "../../components/ui/input.jsx";
import { Button } from "../../components/ui/button.js";
import {BiLoader} from 'react-icons/bi';
import { toast } from "sonner";
import api from "../../libs/apiCall.js";

const LoginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z.string().min(8, "Name must be at least 3 characters"),
});

const SignIn = () => {
  const { user,setCredentails } = useStore((state) => state);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState();

  useEffect(() => {
    user && navigate("/");
  }, [user,navigate]);

  const onSubmit = async (data) => {
    // console.log(data);
     try{
           setLoading(true)
           const {data:res}=await api.post("/auth/sign-in",data);
           if(res?.user){
            toast.success(res?.message);
            const userInfo={...res?.user,token:res.token}
            localStorage.setItem("user",JSON.stringify(userInfo));

            setCredentails(userInfo);
            setTimeout(()=>{
                navigate("/overview")
            },1500)
           }
        }catch(error){
            console.log(error)
            toast.error(error?.response?.data?.message || error.message)
    
        }finally{
            setLoading(false)
        }
  };
  return (
    <div className="flex items-center justify-center w-full min-h-screen py-10">
      <Card className="w-[400px] bg-white dark:bg-black/20 shadow-md overflow-hidden   ">
        <div className="p-6 md:-8">
            <CardHeader className="py-0">
                <CardTitle className="mb-8 text-center dark:text-white">
                   Sign In
                </CardTitle>

            </CardHeader>
            <CardContent className="p-0">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="mb-8 space-y-6 ">
                        <SocialAuth isLoading={loading} setLoading={setLoading} />
                        <Separator />
                        
                        <Input
                        disabled={loading}
                        id="email"
                        label="Email"
                        
                        type="text"
                        name="email"
                        placeholder="First Name"
                        error={errors?.email?.message}

                        {...register("email")}
                        className="text-sm border dark:border-gray-800  dark:bg-transparent dark:placeholder:text-gray-700 dark:text-gray-400 dark:outline-none"
                        />
                        <Input
                       disabled={loading}
                       id="password"
                       label="Password"
                       
                       type="password"
                       name="password"
                       placeholder="First Name"
                       error={errors?.password?.message}

                       {...register("password")}
                       className="text-sm border dark:border-gray-800  dark:bg-transparent dark:placeholder:text-gray-700 dark:text-gray-400 dark:outline-none"
                        />

                    </div>
                    <Button
                    type="submit"
                    className="w-full bg-violet-800"
                    disabled={loading}
                    >
                        {
                            loading ? (
                                <BiLoader className="text-2xl text-white animate-spin" />
                            ):(
                                "Sign in..."
                            )
                        }


                    </Button>

                </form>
            </CardContent>

        </div>
        <CardFooter className="justify-center gap-2">
            <p className="text-sm text-gray-600">Don't have an acount</p>
            <Link 
            to="/sign-up"
            className="text-sm font-semibold text-violet-600 hover:underline">
                Create Account
            </Link>

        </CardFooter>
      </Card>
    </div>
  );
};

export default SignIn;
