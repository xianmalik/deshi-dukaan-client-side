import axios from "axios";
import { useCookies } from "react-cookie";

export default function Signout() {
    const [cookies, setCookie, deleteCookie] = useCookies(['S_User'])

    userEffect(() => {
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
