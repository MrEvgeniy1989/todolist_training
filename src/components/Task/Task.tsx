import React, {ChangeEvent, FC} from 'react';
import {TaskStatuses, TaskType} from "../../api/api";
import {useAppDispatch} from "../../store/store";
import {deleteTaskTC, updateTaskTC} from "../../store/tasksReducer";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import Delete from "@mui/icons-material/Delete";

type PropsType = {
    todolistId: string
    task: TaskType
}

export const Task: FC<PropsType> = ({todolistId, task}) => {
    const dispatch = useAppDispatch()


    const onClickDeleteTaskHandler = () => {
        dispatch(deleteTaskTC(todolistId, task.id))
    };
    const updateTaskTitleHandler = (title: string) => {
        dispatch(updateTaskTC(todolistId, task.id, {title}))
    };
    const onChangeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateTaskTC(todolistId, task.id, {status: event.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New}))
    };
    return (
        <li>
            <input type="checkbox" checked={task.status === TaskStatuses.Completed}
                   onChange={onChangeTaskStatusHandler}/>
            <EditableSpan title={task.title} callback={updateTaskTitleHandler}
                          classNameForSpan={task.status === TaskStatuses.Completed ? 'task-done' : ''}/>
            <IconButton aria-label="delete" onClick={onClickDeleteTaskHandler}>
                <Delete/>
            </IconButton>
        </li>
    )
}