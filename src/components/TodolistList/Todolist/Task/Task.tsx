import React, {ChangeEvent, FC} from 'react';
import {TaskStatuses} from "../../../../store/enums";
import {TaskType} from "../../../../store/types";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Delete from "@mui/icons-material/Delete";
import {EditableSpan} from "../../../UI/EditableSpan/EditableSpan";
import {useAppDispatch} from "../../../../store/store";
import {deleteTask, updateTask} from "../../../../store/reducers/tasksReducer";

type PropsType = {
    todolistId: string,
    task: TaskType
}

export const Task: FC<PropsType> = ({todolistId, task}) => {

    const dispatch = useAppDispatch()

    const onClickDeleteTaskHandler = () => {
        dispatch(deleteTask(todolistId, task.id))
    }
    const changeTaskTitleHandler = (newTitle: string) => {
        dispatch(updateTask(todolistId, task.id, {title: newTitle}))
    }
    const onChangeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateTask(todolistId, task.id, {status: event.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New}))
    }

    return (
        <li>
            <Checkbox checked={task.status !== TaskStatuses.New} onChange={onChangeTaskStatusHandler}/>
            <EditableSpan
                className={task.status !== TaskStatuses.New ? `task-done` : ''}
                title={task.title}
                callback={changeTaskTitleHandler}
            />
            <IconButton onClick={onClickDeleteTaskHandler}>
                <Delete/>
            </IconButton>
        </li>
    )
}