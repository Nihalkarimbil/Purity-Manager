import axios from "axios"

const axiosInstance= axios.create({
    baseURL: "https://purity-manager.onrender.com/api",
    withCredentials:true
})

export default axiosInstance