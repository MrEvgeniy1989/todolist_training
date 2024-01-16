import React, {FC} from 'react';
import {FilterType, RequestStatusType, TaskType} from "../../../store/types";
import {useAppDispatch, useAppSelector} from "../../../store/store";
import Button from "@mui/material/Button";
import {AddItemForm} from "../../UI/AddItemForm/AddItemForm";
import {Task} from "./Task/Task";
import IconButton from "@mui/material/IconButton";
import Delete from "@mui/icons-material/Delete";
import {EditableSpan} from "../../UI/EditableSpan/EditableSpan";
import {updateTodolistTitle} from "../../../store/reducers/todolistsReducer";

type PropsType = {
    todolistId: string
    todolistTitle: string
    filter: FilterType
    entityStatus: RequestStatusType
}

export const Todolist: FC<PropsType> = ({todolistId, todolistTitle, filter, entityStatus}) => {
    const tasks = useAppSelector<TaskType[]>(state => state.tasks[todolistId])
    const dispatch = useAppDispatch()

    const changeTodoTitleHandler = (newTitle: string) => {
        dispatch(updateTodolistTitle(todolistId, newTitle))
    }

    return (
        <div className={'todolist'}>
            <EditableSpan className={'todolistTitle'} title={todolistTitle} callback={changeTodoTitleHandler}/>
            <IconButton aria-label="delete" disabled={entityStatus === 'loading'}>
                <Delete/>
            </IconButton>

            <AddItemForm/>
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
                <Button variant={filter === 'all' ? 'contained' : 'outlined'}>All</Button>
                <Button variant={filter === 'active' ? 'contained' : 'outlined'}>Active</Button>
                <Button variant={filter === 'completed' ? 'contained' : 'outlined'}>Completed</Button>
            </div>
        </div>
    )
}