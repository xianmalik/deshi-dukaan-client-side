import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import Header from "@/components/header";

export default function Register() {
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [user, setUser] = useState({});
    const [cookies, setCookie] = useCookies(['S_User'])

    const formData = watch();

    useEffect(() => {
        if (!cookies.S_User) {
            window.location.href = "/"
        }

        setUser(cookies.S_User);
    }, []);

    const formSubmit = (data) => {
        console.log(cookies);
        axios
            .get(`http://localhost:3000/api/update-profile/${user.S_Id}`)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
                setUser({ S_Id: 1, ...formData });
                setCookie('S_User', { S_Id: 1, ...formData }, { path: '/seller' });
                alert('Account updated');
            });
    };

    const deleteAccount = () => {
        const check = confirm(`Do you want to delete the product with id: ${id} ?`);
        if ( !check ) return;

        axios
            .get(`http://localhost:3000/api/delete-account/${user.S_Id}`)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
                window.location.href = "/signout";
            });
    }

    return (
        <div className="grid text-center lg:mb-0 lg:text-left">
            <Header />
            <div className="mx-auto max-w-screen-lg py-16 lg:max-w-screen-xl w-full">
                <h2 className="text-2xl font-bold tracking-tight text-gray-700 mb-8">Your Account</h2>
                <form onSubmit={handleSubmit(formSubmit)}>
                    <div>
                        <div className="mb-4">
                            <label className="text-gray-600 font-medium mb-2">Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder=""
                                defaultValue={user.S_Name}
                                autoFocus
                                className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
                                {...register("S_Name")}
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
                                defaultValue={user.S_Email}
                                placeholder="example@mail.com"
                                className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
                                {...register("S_Email")}
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
                                defaultValue={user.S_Phone}
                                placeholder="(123) 456 7890"
                                className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
                                {...register("S_Phone")}
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
                                defaultValue={user.S_Dob}
                                type="date"
                                {...register("S_Dob")}
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
                                defaultValue={user.S_Gender}
                                type=""
                                {...register("S_Gender")}
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
                                defaultValue={user.S_Password}
                                className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
                                {...register("S_Password")}
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
                                defaultValue={user.S_CompanyName}
                                className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
                                {...register("S_CompanyName")}
                            />
                            {errors.S_CompanyName && (
                                <div className="mb-3 text-normal text-red-500 ">{errors.S_CompanyName.message}</div>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <a href="/seller/dashboard" className="bg-blue-500 hover:bg-blue-700 text-white text-sm uppercase font-bold tracking-wider py-2 px-4 rounded cursor-pointer">
                            &lt; Go to Dashboard
                        </a>
                        <button type="button" onClick={() => deleteAccount()} className="bg-red-500 hover:bg-red-700 text-white text-sm uppercase font-bold tracking-wider py-2 px-4 rounded cursor-pointer">
                            Delete Account
                        </button>
                        <input className="bg-emerald-500 hover:bg-emerald-700 text-white text-sm uppercase font-bold tracking-wider py-2 px-4 rounded cursor-pointer" type="submit" value="Update Account" />
                    </div>
                </form>
            </div>
        </div>
    )
}
