import {instance} from "./api";
import {ResponseType, UserType} from "../store/types";
import {AxiosResponse} from "axios";

// Types
export type LoginType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha?: boolean
}

export const authApi = {
    me() {
        return instance.get<ResponseType<UserType>>(`/auth/me`)
    },
    login(data: LoginType) {
        return instance.post<ResponseType<{ userId: number }>, AxiosResponse<ResponseType<{
            userId: number
        }>>, LoginType>(`/auth/login`, data)
    },
    logOut() {
        return instance.delete<ResponseType>(`/auth/login`)
    }
}