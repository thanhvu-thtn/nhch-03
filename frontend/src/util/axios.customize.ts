import axios from "axios";
//import { useAppSelector } from "../interface/reduxhook";
// Set config defaults when creating the instance
const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
    headers: {
        "Content-type": "application/json",
    },
});

// Alter defaults after instance has been created
//instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    //if (response && response.data) return response.data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export const axiosJWT = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
    headers: {
        "Content-type": "application/json",
    },
})

axiosJWT.interceptors.request.use(res => {
    //Lấy access token
    /* const currentUser = useAppSelector((state) => state.currentUser.login.currentUser);
    if (currentUser && currentUser.accessToken) {
        const accessToken = currentUser.accessToken;

    } */
    //Kiểm tra access token
    //thực hiện chương trình
    return res
}, err => {
    return Promise.reject(err)
})

export default instance;