import axios from "axios";
import { backendUrl } from "../config";

const getUserContent = (userKey) => {
    return new Promise((resolve, reject) => axios
    .post(backendUrl + "/userdata", {userKey})
    .then(response => resolve(response.data.data))
    .catch(error => reject(error)));
}

export {getUserContent}