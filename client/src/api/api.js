import axios from "axios";

const URL = "http://localhost:9999";
const api = axios.create({
    baseURL : `${URL}/api`
})

export default api
