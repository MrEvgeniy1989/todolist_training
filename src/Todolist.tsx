import React, {FC} from 'react';
import Button from "@mui/material/Button";
import {FilterType, TasksType, TodolistType} from "./App";
import {CheckBox} from "./components/CheckBox";
import {EditableSpan} from "./EditableSpan";
import {AddItemForm} from "./AddItemForm";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

type PropsType = {
    todolist: TodolistType
    tasks: TasksType
    changeTaskTitle: (todolistId: string, taskId: string, newTaskTitle: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, newTaskStatus: boolean) => void
    addTask: (todolistId: string, newTaskTitle: string) => void
    deleteTask: (todolistId: string, taskId: string) => void
    deleteTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTodolistTitle: string) => void
    changeFilter: (todolistId: string, newFilterValue: FilterType) => void
}

export const Todolist: FC<PropsType> = ({
                                            todolist,
                                            tasks,
                                            changeTaskTitle,
                                            changeTaskStatus,
                                            addTask,
                                            deleteTask,
                                            deleteTodolist,
                                            changeTodolistTitle,
                                            changeFilter
                                        }) => {
    const addTaskHandler = (newTaskTitle: string) => {
        addTask(todolist.todolistId, newTaskTitle)
    }
    const onClickDeleteTodolistHandler = () => {
        deleteTodolist(todolist.todolistId)
    }

    const changeTodolistTitleHandler = (newTodolistTitle: string) => {
        changeTodolistTitle(todolist.todolistId, newTodolistTitle)
    }

    let filteredTasks = tasks[todolist.todolistId]
    if (todolist.filter === "active") {
        filteredTasks = tasks[todolist.todolistId].filter(task => !task.isDone)
    } else if (todolist.filter === 'completed') {
        filteredTasks = tasks[todolist.todolistId].filter(task => task.isDone)
    }

    return (
        <div className={'todolist'}>
            <div style={{fontWeight: 'bold', fontSize: '18px'}}>
                <EditableSpan title={todolist.todolistTitle} callback={changeTodolistTitleHandler}/>
                <IconButton aria-label="delete" onClick={onClickDeleteTodolistHandler}>
                    <DeleteIcon/>
                </IconButton>
            </div>
            <AddItemForm callback={addTaskHandler}/>
            {filteredTasks.length
                ? <ul>
                    {filteredTasks.map(task => {
                        const changeTaskTitleHandler = (newTaskTitle: string) => {
                            changeTaskTitle(todolist.todolistId, task.taskId, newTaskTitle)
                        }
                        const changeTaskStatusHandler = (newTaskStatus: boolean) => {
                            changeTaskStatus(todolist.todolistId, task.taskId, newTaskStatus)
                        }
                        const onClickDeleteTaskHandler = () => {
                            deleteTask(todolist.todolistId, task.taskId)
                        }

                        return (
                            <li key={task.taskId}>
                                <CheckBox checked={task.isDone} callback={changeTaskStatusHandler}/>
                                <EditableSpan title={task.taskTitle} callback={changeTaskTitleHandler}/>
                                <IconButton aria-label="delete" onClick={onClickDeleteTaskHandler}>
                                    <DeleteIcon/>
                                </IconButton>
                            </li>
                        )
                    })}
                </ul>
                : <span style={{margin: "10px 0 10px 0", display: 'block'}}>Список задач пуст!</span>
            }

            <div>
                <Button variant={todolist.filter === 'all' ? 'contained' : "outlined"} color={'primary'}
                        onClick={() => changeFilter(todolist.todolistId, 'all')}>All</Button>
                <Button variant={todolist.filter === 'active' ? 'contained' : "outlined"} color={'success'}
                        onClick={() => changeFilter(todolist.todolistId, 'active')}>Active</Button>
                <Button variant={todolist.filter === 'completed' ? 'contained' : "outlined"} color={'secondary'}
                        onClick={() => changeFilter(todolist.todolistId, 'completed')}>Completed</Button>
            </div>
        </div>
    )
}