import React, { ChangeEvent } from "react"
import { TaskType } from "features/todolistList/todolist/task/api/taskApi.types"
import { TaskStatuses } from "common/enums/enums"
import IconButton from "@mui/material/IconButton"
import Delete from "@mui/icons-material/Delete"
import Checkbox from "@mui/material/Checkbox"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { tasksActions } from "features/todolistList/todolist/task/model/tasksSlice"
import { EditableSpan } from "common/components/EditableSpan/EditableSpan"

type Props = {
  todolistId: string
  task: TaskType
}

export const Task = ({ todolistId, task }: Props) => {
  const dispatch = useAppDispatch()

  const onClickDeleteTaskHandler = () => {
    dispatch(tasksActions.deleteTask({ todolistId, taskId: task.id }))
  }
  const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      tasksActions.updateTask({
        todolistId,
        taskId: task.id,
        updateModel: { status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New },
      }),
    )
  }
  const changeTaskTitle = (newTitle: string) => {
    dispatch(
      tasksActions.updateTask({
        todolistId,
        taskId: task.id,
        updateModel: { title: newTitle },
      }),
    )
  }

  return (
    <li
      className={task.status !== TaskStatuses.New ? "task-done" : ""}
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <div>
        <Checkbox checked={task.status !== TaskStatuses.New} onChange={onChangeTaskStatusHandler} />
        <EditableSpan title={task.title} callback={changeTaskTitle} />
      </div>
      <IconButton title={"Удалить задачу"} onClick={onClickDeleteTaskHandler}>
        <Delete />
      </IconButton>
    </li>
  )
}
