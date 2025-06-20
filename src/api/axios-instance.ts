import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://dummy.api.local",
    timeout: 1000,
});

export default axiosInstance;