import axios from "axios";


const apiClient = axios.create({
    baseURL: "http://localhost:3021/api"
})

export default apiClient;