import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Register() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [products, setProducts] = useState([]);
  const [cookies, setCookie] = useCookies(['S_User'], { path: '/'});
  
  useEffect(() => {
    axios
        .get(`http://localhost:3000/api/view-products/${cookies.S_User?.id}`)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
        .finally(function () {
            setProducts([
                {
                    P_Id: 1,
                    P_Uuid: '1',
                    P_Name: 'Product_1',
                    P_Desc: 'This is Product 1 Description',
                    P_Qty: 1,
                    P_Waranty: Date.now(),
                    P_Price: 123,
                    P_CreatedAt: Date.now(),
                    P_ModifiedAt: Date.now()
                },
                {
                    P_Id: 2,
                    P_Uuid: '2',
                    P_Name: 'Product_2',
                    P_Desc: 'This is Product 2 Description',
                    P_Qty: 1,
                    P_Waranty: Date.now(),
                    P_Price: 123,
                    P_CreatedAt: Date.now(),
                    P_ModifiedAt: Date.now()
                }
            ])
        });
  }, [cookies]);

  const deleteProduct = (id) => {
    const check = confirm(`Do you want to delete the product with id: ${id} ?`);
    if ( check ) {
        axios
            .get(`http://localhost:3000/api//delete-product/${id}`)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(() => {
                setProducts(products.filter((product) => product.P_Id !== id))
            })
    }
  }

  return (
    <div className="flex flex-col h-full min-h-screen">
        <Header />
        <div className="mx-auto max-w-screen-lg py-16 lg:max-w-screen-xl w-full flex-1">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Your Products</h2>
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 xl:gap-x-4">
                {products.map((product) => (
                    <div key={product?.P_Id} className="group relative border rounded-lg px-8 py-2">
                        {/* <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                        <img src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg" alt="Front of men's Basic Tee in black." className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
                        </div> */}
                        <div className="flex justify-between gap-1 flex-col">
                            <h3 className="text-sm text-gray-700">
                            <a href="#" className="font-medium text-lg">
                                {product.P_Name}
                            </a>
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">{product.P_Desc}</p>
                            <p className="font-medium text-gray-900 mt-1">${product.P_Price}</p>
                            <div className="flex items-center gap-4 mt-2">
                                <a
                                    href={`/seller/product/view/${product.P_Id}`}
                                    className="text-sm uppercase font-bold underline tracking-wider rounded cursor-pointer">
                                    View
                                </a>
                                <button
                                    onClick={() => deleteProduct(product.P_Id)}
                                    className="text-sm uppercase font-bold underline tracking-wider rounded cursor-pointer">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                
                <div className="flex items-center gap-4">
                    <a
                        href={`/seller/product/add`}
                        className="bg-emerald-500 hover:bg-emerald-700 text-white text-sm uppercase font-bold tracking-wider py-2 px-4 rounded cursor-pointer">
                        + Add a new product
                    </a>
                </div>
            </div>
        </div>
        <Footer />
    </div>
  )
}
