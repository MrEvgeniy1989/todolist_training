import React from 'react'
import {combineReducers, legacy_createStore} from "redux";
import {v1} from "uuid";
import {Provider} from "react-redux";
import {todolistsReducer} from "../store/todolistsReducer";
import {tasksReducer} from "../store/tasksReducer";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
})

const initialGlobalState = {
    todolists: [
        {todolistId: "todolistId1", todolistTitle: "What to learn", filter: "all"},
        {todolistId: "todolistId2", todolistTitle: "What to buy", filter: "all"}
    ],
    tasks: {
        ["todolistId1"]: [
            {taskId: v1(), isDone: false, taskTitle: "CSS"},
            {taskId: v1(), isDone: true, taskTitle: "HTML"},
            {taskId: v1(), isDone: true, taskTitle: "JS"},
            {taskId: v1(), isDone: true, taskTitle: "React"},
            {taskId: v1(), isDone: false, taskTitle: "Redux"},
        ],
        ["todolistId2"]: [
            {taskId: v1(), isDone: false, taskTitle: "Milk"},
            {taskId: v1(), isDone: false, taskTitle: "Bread"},
            {taskId: v1(), isDone: false, taskTitle: "Butter"},
            {taskId: v1(), isDone: true, taskTitle: "Chocolate"},
            {taskId: v1(), isDone: false, taskTitle: "Banana"},
        ]
    }
};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as any);


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}