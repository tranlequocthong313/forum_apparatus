import axios, {Axios, AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig} from "axios";
import {useCallback, useState} from "react";


const axiosInstance = axios.create({
    baseURL: 'https://localhost:8080',
    timeout: 60000,
    headers: {
        'Content-Type': 'application/json',
    }
})

axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers = config.headers || {};
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem('refreshToken');
                const response = await axiosInstance.post('/auth/refresh-token', {refreshToken});
                const {accessToken} = response.data;

                localStorage.setItem('accessToken', accessToken);
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.error('Failed to refresh token:', refreshError);
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

interface ApiState<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
    originResponse: AxiosResponse | null;
}

type ApiFunction<T, P extends any[]> = (...args: P) => Promise<AxiosResponse<T>>;

export function useApi<T, P extends any[]>(apiFunc: ApiFunction<T, P>) {
    const [state, setState] = useState<ApiState<T>>({
        data: null,
        loading: false,
        error: null,
        originResponse: null
    });

    const execute = useCallback(
        async (...args: P) => {
            setState({data: null, loading: true, error: null, originResponse: null});

            try {
                const response = await apiFunc(...args);
                setState({data: response.data, loading: false, error: null, originResponse: response});
                return response;
            } catch (error) {
                const axiosError = error as AxiosError;
                setState({data: null, loading: false, error: axiosError, originResponse: null});
                throw error;
            }
        },
        [apiFunc]
    );

    return {
        ...state,
        execute
    }

}

export const apiRequest = async <T = any>(
    config: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
    return axiosInstance(config);
    // return axios<T, AxiosResponse>(config);
};

export const get = <T = any>(path: string, config?: AxiosRequestConfig) =>
    apiRequest<T>({...config, method: 'GET', url: path});


export const post = <T = any>(path: string, data?: any, config?: AxiosRequestConfig) =>
    apiRequest<T>({...config, method: 'POST', url: path, data});

export const put = <T = any>(path: string, data?: any, config?: AxiosRequestConfig) =>
    apiRequest<T>({...config, method: 'PUT', url: path, data});

export const del = <T = any>(path: string, config?: AxiosRequestConfig) =>
    apiRequest<T>({...config, method: 'DELETE', url: path});