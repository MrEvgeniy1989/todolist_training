import React from "react"
import { TaskType } from "features/todolistList/todolist/task/api/taskApi.types"
import { TaskStatuses } from "common/enums/enums"

type Props = {
  task: TaskType
}

export const Task = ({ task }: Props) => {
  return (
    <li
      className={task.status !== TaskStatuses.New ? "task-done" : ""}
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <div>
        <input type="checkbox" checked={task.status !== TaskStatuses.New} />
        <span>{task.title}</span>
      </div>
      <button>X</button>
    </li>
  )
}
