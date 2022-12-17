
import axios from "axios";
const API_URL = "http://localhost:9000/api/";


//const API_URL = "http://localhost:9000/api/login";
class loginService {

    async  fetchLogin(email,password)
    {
        return fetch('http://localhost:9000/api/login', {
            method: 'post',
            headers: new Headers({
                'Authorization': 'Basic ' + btoa(email + ':' + password),
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        }).then((response) => response.json())
            .then((result) => {
                return result
            });
    }

    signUp(list) {
        return axios.post(API_URL + "signUp",

                list);
    }




}
export default new loginService();
