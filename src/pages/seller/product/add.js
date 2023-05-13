import { useState, useEffect } from 'react';
import axios from "axios";
import { useRouter } from 'next/router';
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
 
export default function Page() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [user, setUser] = useState({});
  const [cookies, setCookie] = useCookies(['S_User'], { path: '/'});

  useEffect(() => {
    if (!cookies.S_User) {
        window.location.href = "/"
    }
    
    setUser(cookies.S_User);
  }, [cookies]);

  const formSubmit = (data) => {
    axios
        .post(`http://localhost:3000/api/create-product/${cookies.S_User?.id}`, data)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
        .finally(() => {
            window.location.href = "/seller/dashboard"
        })
  }

  return (
    <div className="grid text-center lg:mb-0 lg:text-left">
        <div className="mx-auto max-w-screen-lg py-16 lg:max-w-screen-xl w-full">
            {!!user && (
                <div className="text-lg font-medium flex justify-between mb-8">
                    <span>Welcome, {user?.S_Name || ""}</span>
                    <a href="/signout" className="text-sm rounded uppercase px-2 py-1 bg-red-500 text-white hover:bg-red-700 font-normal ms-4">Signout</a>
                </div>
            )}

            <h2 className="text-3xl font-bold text-gray-700 mb-4">Add a new product</h2>
        
            <form onSubmit={handleSubmit(formSubmit)}>
                <div className="mb-4">
                    <label className="text-gray-600 font-medium mb-2">Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder=""
                        autoFocus
                        className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
                        {...register("P_Name", { required: true })}
                    />
                    {errors.P_Name && (
                        <div className="mb-3 text-normal text-red-500 ">{errors.P_Name.message}</div>
                    )}
                </div>
                <div className="mb-4">
                    <label className="text-gray-600 font-medium mb-2">Description</label>
                    <input
                        type="text"
                        name="desc"
                        placeholder=""
                        autoFocus
                        className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
                        {...register("P_Desc", { required: true })}
                    />
                    {errors.P_Desc && (
                        <div className="mb-3 text-normal text-red-500 ">{errors.P_Desc.message}</div>
                    )}
                </div>
                <div className="mb-4">
                    <label className="text-gray-600 font-medium mb-2">Price</label>
                    <input
                        type="number"
                        name="price"
                        placeholder=""
                        autoFocus
                        className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
                        {...register("P_Price", { required: true })}
                    />
                    {errors.P_Price && (
                        <div className="mb-3 text-normal text-red-500 ">{errors.P_Price.message}</div>
                    )}
                </div>
                <div className="mb-4">
                    <label className="text-gray-600 font-medium mb-2">Quantity</label>
                    <input
                        type="number"
                        name="qty"
                        placeholder=""
                        autoFocus
                        className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
                        {...register("P_Qty", { required: true })}
                    />
                    {errors.P_Qty && (
                        <div className="mb-3 text-normal text-red-500 ">{errors.P_Qty.message}</div>
                    )}
                </div>
                <div className="mb-4">
                    <label className="text-gray-600 font-medium mb-2">Warranty</label>
                    <input
                        type="date"
                        name="qty"
                        placeholder=""
                        autoFocus
                        className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
                        {...register("P_Waranty", { required: true })}
                    />
                    {errors.P_Waranty && (
                        <div className="mb-3 text-normal text-red-500 ">{errors.P_Waranty.message}</div>
                    )}
                </div>

                <div className="flex items-center justify-between gap-4 mt-8">
                    <a
                        href={`/seller/dashboard`}
                        className="bg-emerald-500 hover:bg-emerald-700 text-white text-sm uppercase font-bold tracking-wider py-2 px-4 rounded cursor-pointer">
                        {"< Back to all products"}
                    </a>
                    <input className="bg-emerald-500 hover:bg-emerald-700 text-white text-sm uppercase font-bold tracking-wider py-2 px-4 rounded cursor-pointer" type="submit" value="Register" />
                </div>
            </form>

        </div>
    </div>
  )
}
