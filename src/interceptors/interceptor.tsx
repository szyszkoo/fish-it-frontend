import axios, { AxiosRequestConfig } from 'axios'

export const baseConfig = {
    baseURL: 'https://simpletons-backend.herokuapp.com',
} as AxiosRequestConfig;

export const axiosInstance = axios.create(baseConfig);