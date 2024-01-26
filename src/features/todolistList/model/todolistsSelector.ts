import { AppRootStateType } from "app/store"
import { TodolistDomain } from "features/todolistList/api/todolistApi.types"

export const selectTodolists = (state: AppRootStateType): TodolistDomain[] => state.todolists
