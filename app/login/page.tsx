"use client";

import React, { useState } from "react";
import Image from "next/image";
import TextField from "@/components/TextField";
import Button from "@/components/Buton";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "@/lib/features/loginSlice";
import { Controller, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
// import { useSession, getSession  } from "next-auth/react";
import Spinner from "@/components/Spinner";

type FormValues = {
    username: string;
    password: string;
  };

const Login = () => {
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
  
    const [onGoingRequest, setOnGoingRequest] = useState(false)
  
    // const formData = useSelector((state: RootState) => state.auth);
  // const profile = useSelector((state: RootState) => state.auth.profile);
  
    const dispatch = useDispatch();
  
    // const { data: session } = useSession();
    // console.log("Session Data in Frontend:", session?.user);
  

    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm<FormValues>({
      mode: "onChange",
      defaultValues: {
        username: "",
        password: "",
      },
    });
  
   console.log("FORM DATA" )

  
    const onSubmit = async (data: FormValues) => {
    //   setOnGoingRequest(true)
    //   dispatch(loginStart());
    
      const signInData = await signIn("credentials", {
        username: data.username,
        password: data.password,
        redirect: false,
      });
      console.log("SIGNIN DATA",signInData)

      if(signInData?.error){
        console.log("SignInDataError", signInData.error)
      }else{
        router.push("/dashboard");
      }
    
    //   if (response?.error) {
    //     dispatch(loginFailure("Invalid credentials"));
    //     alert("Invalid credentials");
    //     return;
    //   }
    
      
    };
    
    
  return (
    <div className="flex items-center justify-center px-4 lg:px-0 my-8">
        <div className="grid grid-cols-1 md:grid-cols-2 w-[800px] h-[500px] border-gray-200 border-2 shadow-lg rounded-[36px]">
          <div className="flex flex-col flex-grow">
            <div className="flex justify-center items-start">
              {/* <Image
                src="/images/png/surigaocity_logo.png"
                height={60}
                width={60}
                alt="logo"
                className="object-contain pt-[36px]"
              /> */}
            </div>
            <div className="flex-grow">
              <p className="py-6 text-center text-gray-800 font-bold text-xl">
                City Government Portal
              </p>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="px-8 w-full max-w-md flex flex-col gap-3"
              >
                <Controller
                  name="username"
                  control={control}
                  rules={{
                    required: "Username is required",
                    minLength: {
                      value: 5,
                      message: "Username must be at least 5 characters",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Username"
                      placeholder="Enter your username"
                      error={errors.username?.message}
                      styles={{ variant: "bordered" }}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value);
                        // dispatch(loginUsername(value));
                      }}
                    />
                  )}
                />
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                    // pattern: {
                    //   value: /^(?=.*[A-Z])(?=.*\d)/,
                    //   message: "Password must contain at least one uppercase letter and one number",
                    // },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Password"
                      type="password"
                      error={errors.password?.message}
                      placeholder="Enter your password"
                      styles={{ variant: "bordered" }}
                      icon={
                        showPassword ? (
                          <FaRegEye className="text-gray-500" />
                        ) : (
                          <FaRegEyeSlash className="text-gray-500" />
                        )
                      }
                      showPassword={showPassword}
                      onToggleShowPassword={() =>
                        setShowPassword(!showPassword)
                      }
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value);
                        // dispatch(loginPass(value));
                      }}
                    />
                  )}
                />
                <div className="flex justify-between items-center mb-6">
                  {/* <CheckBox
                    id="rememberMe"
                    label="Remember Me"
                    checked={rememberMe}
                    onChange={setRememberMe}
                  /> */}
                  <Link
                    href="/forgot-password"
                    className="text-xs md:text-sm text-blue-600 hover:underline cursor-pointer"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Button
                  type="submit"
                  color="dominant"
                  variant="filled"
                  size="fullWidth"
                  title={onGoingRequest ? (
                    <>
                      <Spinner size={20} className="text-white"/>
                    </>
                  ) : (
                    "Submit"
                  )}
                />
              </form>
            </div>
          </div>
          <div className="relative rounded-tr-[36px] rounded-br-[36px] overflow-hidden hidden md:block">
            <Image
              src="/images/jpg/img1.jpg"
              alt="image1"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      </div>
  )
}

export default Login