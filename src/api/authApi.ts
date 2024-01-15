import {instance} from "./api";

// Types
type LoginType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha?: boolean
}

export const authApi = {
    me() {
        return instance.get(`/auth/me`)
    },
    login(data: LoginType) {
        return instance.post(`/auth/login`, data)
    },
    logOut() {
        return instance.delete(`/auth/login`)
    }
}