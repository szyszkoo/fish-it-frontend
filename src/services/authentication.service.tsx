import { Subject } from 'rxjs'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { axiosInstance } from 'src/interceptors/interceptor';
import { User } from 'src/model/user';

const currentUserTokenSubject = new Subject<string>();
let currentUser: User;
const login = (username: string, password: string) => {

    const basicToken = `Basic ${btoa(`${username}:${password}`)}`;
    axiosInstance.get(`/user`, {
        headers: {
            'Authorization': basicToken
        }
    }).then(((user: AxiosResponse<User>) => {
        currentUserTokenSubject.next(basicToken);
        axiosInstance.interceptors.request.use((config) => {
            config.headers.authorization = basicToken
            return config;
        });
        currentUser = user.data;
    }));
}

export const authenticationService = {
    login,
    userToken: currentUserTokenSubject.asObservable()
}