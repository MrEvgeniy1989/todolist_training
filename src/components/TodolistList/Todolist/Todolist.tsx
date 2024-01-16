import React, {FC, useMemo} from 'react';
import {FilterType, RequestStatusType, TaskType} from "../../../store/types";
import {useAppDispatch, useAppSelector} from "../../../store/store";
import Button from "@mui/material/Button";
import {AddItemForm} from "../../UI/AddItemForm/AddItemForm";
import {Task} from "./Task/Task";
import IconButton from "@mui/material/IconButton";
import Delete from "@mui/icons-material/Delete";
import {EditableSpan} from "../../UI/EditableSpan/EditableSpan";
import {changeTodolistFilterAC, updateTodolistTitle} from "../../../store/reducers/todolistsReducer";
import {addTaskTC} from "../../../store/reducers/tasksReducer";
import {TaskStatuses} from "../../../store/enums";

type PropsType = {
    todolistId: string
    todolistTitle: string
    filter: FilterType
    entityStatus: RequestStatusType
}

export const Todolist: FC<PropsType> = ({todolistId, todolistTitle, filter, entityStatus}) => {
    let tasks = useAppSelector<TaskType[]>(state => state.tasks[todolistId])
    const dispatch = useAppDispatch()


    const addTask = (title: string) => {
        dispatch(addTaskTC(todolistId, title))
    }
    const changeTodolistTitleHandler = (newTitle: string) => {
        dispatch(updateTodolistTitle(todolistId, newTitle))
    }

    const onClickFilterAllHandler = () => dispatch(changeTodolistFilterAC(todolistId, 'all'))
    const onClickFilterActiveHandler = () => dispatch(changeTodolistFilterAC(todolistId, 'active'))
    const onClickFilterCompletedHandler = () => dispatch(changeTodolistFilterAC(todolistId, 'completed'))

    tasks = useMemo(() => {
        let filteredTasks = [...tasks]

        if (filter === 'active') {
            filteredTasks = tasks.filter(task => task.status === TaskStatuses.New)
        } else if (filter === 'completed') {
            filteredTasks = tasks.filter(task => task.status === TaskStatuses.Completed)
        }

        return filteredTasks
    }, [filter, tasks]);

    return (
        <div className={'todolist'}>
            <EditableSpan className={'todolistTitle'} title={todolistTitle} callback={changeTodolistTitleHandler}/>
            <IconButton aria-label="delete" disabled={entityStatus === 'loading'}>
                <Delete/>
            </IconButton>

            <AddItemForm callback={addTask}/>
            <ul>
                {!tasks.length
                    ? <span>Список задач пуст!</span>
                    : tasks.map(task => {
                        return (
                            <Task key={task.id} todolistId={todolistId} task={task}/>
                        )
                    })}
            </ul>
            <div>
                <Button variant={filter === 'all' ? 'contained' : 'outlined'}
                        onClick={onClickFilterAllHandler}>All</Button>
                <Button variant={filter === 'active' ? 'contained' : 'outlined'}
                        onClick={onClickFilterActiveHandler}>Active</Button>
                <Button variant={filter === 'completed' ? 'contained' : 'outlined'}
                        onClick={onClickFilterCompletedHandler}>Completed</Button>
            </div>
        </div>
    )
}