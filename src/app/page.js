'use client'
import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";

export default function Home() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formData = watch();
  const [cookies, setCookie] = useCookies(['S_User'])

  const formSubmit = (data) => {
    axios
      .post('http://localhost:3000/api/sign-in', formData)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
          console.log(error);
      })
      .finally(function () {
        setCookie('S_User', {
          S_Id: 1,
          S_Name: 'John Doe',
          S_Email: 'john@doe.com',
          S_Phone: '1234567890',
          S_Dob: Date.now(),
          S_Gender: 'male',
          S_CompanyName: 'John Doe Company',
        }, { path: '/seller' });
        window.location.href = "/seller/dashboard"
      });
  };

  return (
    <div className="mx-auto max-w-screen-lg py-16 lg:max-w-screen-xl w-full">
      <form onSubmit={handleSubmit(formSubmit)}>
        <div>
          <div className="mb-4">
            <label className="text-gray-600 font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              placeholder="example@mail.com"
              autoFocus
              className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
              {...register("S_Email", { required: true })}
            />
            {errors.S_Email && (
              <div className="mb-3 text-normal text-red-500 ">{errors.S_Email.message}</div>
            )}
          </div>
          <div className="mb-4">
            <label className="text-gray-600 font-medium mb-2">Password</label>
            <input
              className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
              name="password"
              type="password"
              placeholder="******"
              {...register("S_Password", { required: true })}
            />
            {errors.S_Password && (
              <div className="mb-3 text-normal text-red-500 ">{errors.S_Password.message}</div>
            )}
          </div>
        </div>

        <div className="flex justify-between">
          <a href="/register" className="bg-blue-500 hover:bg-blue-700 text-white text-sm uppercase font-bold tracking-wider py-2 px-4 rounded cursor-pointer">Register Here</a>
          <input className="bg-emerald-500 hover:bg-emerald-700 text-white text-sm uppercase font-bold tracking-wider py-2 px-4 rounded cursor-pointer" type="submit" value="Sign In" />
        </div>
      </form>
    </div>
  )
}
