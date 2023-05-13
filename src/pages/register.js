import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";

export default function Register() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [cookies, setCookie] = useCookies(['S_User'])

  const formData = watch();

  const formSubmit = (data) => {
    console.log(cookies);
    axios
      .post('http://localhost:3000/api/register', formData)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
          console.log(error);
      })
      .finally(function () {
          setCookie('S_User', { id: 1, ...formData }, { path: '/seller' });
          window.location.href = "/seller/dashboard"
      });
  };

  return (
    <div className="grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">  
      <form onSubmit={handleSubmit(formSubmit)}>
        <div>
            <div className="mb-4">
            <label className="text-gray-600 font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              placeholder=""
              autoFocus
              className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
              {...register("S_Name", { required: true })}
            />
            {errors.S_Name && (
              <div className="mb-3 text-normal text-red-500 ">{errors.S_Email.message}</div>
            )}
            </div>
            {/* Email */}
            <div className="mb-4">
            <label className="text-gray-600 font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              placeholder="example@mail.com"
              className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
              {...register("S_Email", { required: true })}
            />
            {errors.S_Email && (
              <div className="mb-3 text-normal text-red-500 ">{errors.S_Email.message}</div>
            )}
            </div>
            {/* Phone */}
            <div className="mb-4">
            <label className="text-gray-600 font-medium mb-2">Phone</label>
            <input
              type="tel"
              name="phone"
              placeholder="(123) 456 7890"
              className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
              {...register("S_Phone", { required: true })}
            />
            {errors.S_Phone && (
              <div className="mb-3 text-normal text-red-500 ">{errors.S_Phone.message}</div>
            )}
            </div>
            {/* Date of Birth */}
            <div className="mb-4">
            <label className="text-gray-600 font-medium mb-2">Date of Birth</label>
            <input
              className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
              name="dob"
              type="date"
              {...register("S_Dob", { required: true })}
            />
            {errors.S_Dob && (
              <div className="mb-3 text-normal text-red-500 ">{errors.S_Dob.message}</div>
            )}
            </div>
            {/* Gender */}
            <div className="mb-4">
            <label className="text-gray-600 font-medium mb-2">Gender</label>
            <select
              className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
              name="gender"
              type=""
              {...register("S_Gender", { required: true })}
            >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>
            {errors.S_Gender && (
              <div className="mb-3 text-normal text-red-500 ">{errors.S_Gender.message}</div>
            )}
            </div>
            {/* Password */}
            <div className="mb-4">
            <label className="text-gray-600 font-medium mb-2">Password</label>
            <input
              type="password"
              name="password"
              className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
              {...register("S_Password", { required: true })}
            />
            {errors.S_Password && (
              <div className="mb-3 text-normal text-red-500 ">{errors.S_Password.message}</div>
            )}
            </div>
            {/* Password */}
            <div className="mb-4">
            <label className="text-gray-600 font-medium mb-2">Company Name</label>
            <input
              type="company_name"
              name="text"
              className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
              {...register("S_CompanyName", { required: true })}
            />
            {errors.S_CompanyName && (
              <div className="mb-3 text-normal text-red-500 ">{errors.S_CompanyName.message}</div>
            )}
            </div>
        </div>

        <div className="formData">
          <input className="bg-emerald-500 hover:bg-emerald-700 text-white text-sm uppercase font-bold tracking-wider py-2 px-4 rounded cursor-pointer" type="submit" value="Register" />
        </div>
      </form>
    </div>
  )
}
