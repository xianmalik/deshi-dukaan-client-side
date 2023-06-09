import { useState, useEffect } from 'react';
import axios from "axios";
import { useRouter } from 'next/router';
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import Header from '@/components/header';
import Footer from '@/components/footer';
 
export default function Page() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [product, setProduct] = useState({});
  const [cookies, setCookie] = useCookies(['S_User'], { path: '/'});

  useEffect(() => {
    axios
        .get(`http://localhost:3000/api/view-product/${router.query.id}`)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
        .finally(function () {
            setProduct({
                P_Id: 1,
                P_Uuid: '1',
                P_Name: 'Product_1',
                P_Desc: 'This is Product 1 Description',
                P_Qty: 1,
                P_Waranty: Date.now(),
                P_Price: 123,
                P_CreatedAt: Date.now(),
                P_ModifiedAt: Date.now()
            })
        });
  }, [cookies]);

  const formatDate = (timestamp) => {
    const dateFormat = new Date(timestamp);
    return dateFormat.getDate() + "/" + (dateFormat.getMonth() + 1) + "/" + dateFormat.getFullYear();
  }

  return (
    <div className="flex flex-col h-full min-h-screen">
        <Header />
        <div className="mx-auto max-w-screen-lg py-16 lg:max-w-screen-xl w-full flex-1">
            <h3 className="text-sm text-gray-700">
            <a href="#" className="font-medium text-lg">
                {product.P_Name}
            </a>
            </h3>
            <p className="mt-1 text-sm text-gray-500">{product.P_Desc}</p>
            <p className="mt-1 text-sm text-gray-500">uuid: {product.P_Uuid}</p>
            <p className="mt-1 text-sm font-medium text-gray-500">Price: ${product.P_Price}</p>
            <p className="mt-1 text-sm font-medium text-gray-500">Quantity: {product.P_Qty}</p>
            <p className="mt-1 text-sm font-medium text-gray-500">Warranty: {formatDate(product.P_Waranty)}</p>
        </div>
        <Footer />
    </div>
  )
}
