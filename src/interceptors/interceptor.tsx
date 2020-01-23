import axios, { AxiosRequestConfig } from 'axios'

export const baseConfig = {
    baseURL: 'https://simpletons-backend.herokuapp.com',
    //baseURL: 'http://localhost:5000'
} as AxiosRequestConfig;

export const axiosInstance = axios.create(baseConfig);