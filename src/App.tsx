import React, {useReducer, useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC,
    deleteTodolistAC,
    todolistsReducer
} from "./reducers/todolistsReducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC, tasksReducer} from "./reducers/tasksReducer";
import {Container, Grid, Paper} from "@mui/material";
import ButtonAppBar from "./components/ButtonAppBar";
import {AddItemForm} from "./AddItemForm";
import {v1} from "uuid";

export type FilterType = 'all' | 'active' | 'completed'

export type TodolistType = {
    todolistId: string
    todolistTitle: string
    filter: FilterType
}
export type TaskType = {
    taskId: string
    taskTitle: string
    isDone: boolean
}
export type TasksType = {
    [key: string]: TaskType[]
}

export const App = () => {

    const todolistId1 = crypto.randomUUID()
    const todolistId2 = crypto.randomUUID()

    const [todolists, dispatchTodolists] = useReducer(todolistsReducer, [
        {todolistId: todolistId1, todolistTitle: "Что изучить", filter: 'all'},
        {todolistId: todolistId2, todolistTitle: "Что купить", filter: 'all'},
    ])
    const [tasks, dispatchTasks] = useReducer(tasksReducer, {
        [todolistId1]: [
            {taskId: crypto.randomUUID(), taskTitle: "HTML", isDone: true},
            {taskId: crypto.randomUUID(), taskTitle: "CSS", isDone: true},
            {taskId: crypto.randomUUID(), taskTitle: "JS", isDone: true},
            {taskId: crypto.randomUUID(), taskTitle: "React", isDone: false},
            {taskId: crypto.randomUUID(), taskTitle: "Redux", isDone: false}
        ],
        [todolistId2]: [
            {taskId: crypto.randomUUID(), taskTitle: "Milk", isDone: true},
            {taskId: crypto.randomUUID(), taskTitle: "Chocolate", isDone: false},
            {taskId: crypto.randomUUID(), taskTitle: "Bread", isDone: true},
            {taskId: crypto.randomUUID(), taskTitle: "Butter", isDone: true},
            {taskId: crypto.randomUUID(), taskTitle: "Banana", isDone: false}
        ]
    })

    const changeTaskTitle = (todolistId: string, taskId: string, newTaskTitle: string) => {
        dispatchTasks(changeTaskTitleAC(todolistId, taskId, newTaskTitle))
    }
    const changeTaskStatus = (todolistId: string, taskId: string, newTaskStatus: boolean) => {
        dispatchTasks(changeTaskStatusAC(todolistId, taskId, newTaskStatus))
    }
    const addTask = (todolistId: string, newTaskTitle: string) => {
        dispatchTasks(addTaskAC(todolistId, newTaskTitle))
    }
    const deleteTask = (todolistId: string, taskId: string) => {
        dispatchTasks(deleteTaskAC(todolistId, taskId))
    }

    const addTodolist = (newTodolistTitle: string) => {
        const todolistId = v1()
        dispatchTodolists(addTodolistAC(todolistId, newTodolistTitle))
        dispatchTasks(addTodolistAC(todolistId, newTodolistTitle))
    }

    const deleteTodolist = (todolistId: string) => {
        dispatchTodolists(deleteTodolistAC(todolistId))
        dispatchTasks(deleteTodolistAC(todolistId))
    }

    const changeTodolistTitle = (todolistId: string, newTodolistTitle: string) => {
        dispatchTodolists(changeTodolistTitleAC(todolistId, newTodolistTitle))
    }
    const changeFilter = (todolistId: string, newFilterValue: FilterType) => {
        dispatchTodolists(changeFilterAC(todolistId, newFilterValue))
    }

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{margin: '20px'}}>
                    <AddItemForm callback={addTodolist}/>
                </Grid>
                <Grid container>
                    {todolists.map(todolist => {
                        return (
                            <Grid item style={{margin: '20px'}} key={todolist.todolistId}>
                                <Paper elevation={24} style={{padding: '20px'}}>
                                    <Todolist
                                        todolist={todolist}
                                        tasks={tasks}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTaskStatus={changeTaskStatus}
                                        addTask={addTask}
                                        deleteTask={deleteTask}
                                        deleteTodolist={deleteTodolist}
                                        changeTodolistTitle={changeTodolistTitle}
                                        changeFilter={changeFilter}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}