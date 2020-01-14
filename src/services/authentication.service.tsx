import { Subject } from 'rxjs'
import { AxiosResponse } from 'axios';
import { axiosInstance } from 'src/interceptors/interceptor';
import { User } from 'src/model/user';


const currentUserSubject = new Subject<User>();
let currentUser: User;
let currentInterceptor: number;
const login = (username: string, password: string) => {
    const basicToken = `Basic ${btoa(`${username}:${password}`)}`;
    return axiosInstance.get(`/user`, {
        headers: {
            'Authorization': basicToken
        }
    }).then(((user: AxiosResponse<User>) => {
        currentUserSubject.next(user.data);
        currentInterceptor = axiosInstance.interceptors.request.use((config) => {
            config.headers.authorization = basicToken
            return config;
        });
        currentUser = user.data;
    }));
}


const logout = () => {
    axiosInstance.interceptors.request.eject(currentInterceptor);
    currentUserSubject.next(undefined);
    currentUser = {} as User;
    currentInterceptor = -1;
};

export const authenticationService = {
    login,
    logout,
    userChange: currentUserSubject.asObservable()
}