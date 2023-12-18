import React, {ChangeEvent, FC, memo, useCallback} from 'react';
import {changeTaskStatusAC, changeTaskTitleAC, deleteTasksAC, TaskType} from "../../store/tasksReducer";
import IconButton from "@mui/material/IconButton";
import Delete from "@mui/icons-material/Delete";
import {Checkbox} from "@mui/material";
import {useDispatch} from "react-redux";
import {EditableSpan} from "../UI/EditableSpan/EditableSpan";

type TaskPropsType = {
    todolistId: string
    task: TaskType
}

export const Task: FC<TaskPropsType> = memo(({todolistId, task}) => {
    const dispatch = useDispatch()

    const deleteTask = () => dispatch(deleteTasksAC(todolistId, task.taskId))
    const changeTaskStatus = (event: ChangeEvent<HTMLInputElement>) => dispatch(changeTaskStatusAC(todolistId, task.taskId, event.currentTarget.checked))
    const changeTaskTitle = useCallback((newTitle: string) => dispatch(changeTaskTitleAC(todolistId, task.taskId, newTitle)), [dispatch, changeTaskTitleAC, todolistId, task.taskId])


    return (
        <li style={{display: "flex", justifyContent: 'space-between', alignItems: 'center'}}>
            <div>
                <Checkbox checked={task.isDone} onChange={changeTaskStatus}/>
                <EditableSpan className={task.isDone ? 'task-done' : ''} title={task.taskTitle}
                              callback={(newTitle) => changeTaskTitle(newTitle)}/>
            </div>
            <IconButton onClick={deleteTask}>
                <Delete/>
            </IconButton>
        </li>
    )
})