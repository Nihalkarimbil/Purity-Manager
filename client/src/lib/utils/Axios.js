import axios from "axios"

const axiosInstance= axios.create({
    baseURL: "https://purity-manager.onrender.com/api",
    //baseURL: "http://localhost:3000/api",
    withCredentials:true
})

export default axiosInstance