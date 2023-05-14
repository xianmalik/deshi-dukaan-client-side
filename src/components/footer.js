import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export default function Footer() {
    return (
        <div className="mt-8 border-t py-6">
            <div className="text-sm text-gray-700 text-center mx-auto max-w-screen-lg lg:max-w-screen-xl w-full">
                Copyright, Deshi Dukaan &copy;
            </div>
        </div>
    );
}
