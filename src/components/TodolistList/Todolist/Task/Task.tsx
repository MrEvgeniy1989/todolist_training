import React, {FC} from 'react';
import {TaskStatuses} from "../../../../store/enums";
import {TaskType} from "../../../../store/types";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Delete from "@mui/icons-material/Delete";

type PropsType = {
    todolistId: string,
    task: TaskType
}

export const Task: FC<PropsType> = ({todolistId, task}) => {
    return (
        <li>
            <Checkbox checked={task.status !== TaskStatuses.New}/>
            <span className={task.status !== TaskStatuses.New ? `task-done` : ''}>{task.title}</span>
            <Button>
                <IconButton>
                    <Delete/>
                </IconButton>
            </Button>
        </li>
    )
}