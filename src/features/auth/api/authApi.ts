import { instance } from "common/api/instance"
import { LoginData, User } from "features/auth/api/authApi.types"
import { AppResponseType } from "common/types/types"
import { AxiosResponse } from "axios"

export const authApi = {
  me() {
    return instance.get<AppResponseType<User>>(`/auth/me`)
  },
  login(loginData: LoginData) {
    return instance.post<
      AppResponseType<{ userId: string }>,
      AxiosResponse<
        AppResponseType<{
          userId: string
        }>
      >,
      LoginData
    >(`/auth/login`, loginData)
  },
  logout() {
    return instance.delete<AppResponseType>(`/auth/login`)
  },
}
