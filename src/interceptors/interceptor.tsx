import axios, { AxiosRequestConfig } from 'axios'
import { authenticationService } from 'src/services/authentication.service';

export const baseConfig = {
    baseURL: 'https://simpletons-backend.herokuapp.com',
} as AxiosRequestConfig;

export const axiosInstance = axios.create(baseConfig);





