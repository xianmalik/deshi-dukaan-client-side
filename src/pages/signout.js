import { useEffect } from 'react';
import axios from "axios";
import { useCookies } from "react-cookie";

export default function Signout() {
    const [cookies, setCookie, deleteCookie] = useCookies(['S_User'])

    useEffect(() => {
    axios
        .post('http://localhost:3000/api/signout')
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
        .finally(function () {
            deleteCookie('S_User');
            window.location.href = "/"
        });
    }, []);
    return true;
}
