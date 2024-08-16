import axios, {AxiosInstance, AxiosResponse} from "axios";
import {refreshToken} from "./auth";


const BASE_URL = 'https://localhost:3000';

const api: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 60000,
    withCredentials: false
});

api.interceptors.request.use(
    (config: any) => {
        const token = localStorage.getItem('accessToken');
        if(token) {
            config.headers = config.headers || {};
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const userData = await refreshToken();
                if (userData) {
                    localStorage.setItem('accessToken', userData.accessToken);
                    api.defaults.headers.common['Authorization'] = `Bearer ${userData.accessToken}`;
                    return api(originalRequest);
                }
            } catch (refreshError) {
                console.error('Failed to refresh token:', refreshError);
            }
        }
        return Promise.reject(error);
    }
);
export default api;

