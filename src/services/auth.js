import axios from "axios";
import { backendUrl } from "../config";

const loginRequest = (loginData) => {
    return new Promise((resolve, reject) => axios
    .post(backendUrl + "/login", {...loginData})
    .then(response => resolve(response))
    .catch(error => reject(error.response)));
}

export {loginRequest};