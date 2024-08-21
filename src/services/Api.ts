import {User, UserRegisterState} from "../types/user";
import {get, post} from "../hooks/useApi";

const Api = {
    register: (data: FormData) =>
        post('/users/register', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }),
    login: (username: string, password: string) =>
        post<User>('/users/login', {username, password}),
    getCurrentUser: () =>
        get<User>('/users/current')

}

export default Api;
