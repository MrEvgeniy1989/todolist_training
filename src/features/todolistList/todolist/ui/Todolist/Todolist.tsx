import React from "react"
import { TodolistDomain } from "features/todolistList/api/todolistApi.types"
import { useAppSelector } from "common/hooks/useAppSelector"
import { Task } from "features/todolistList/todolist/task/ui/Task/Task"
import { TaskType } from "features/todolistList/todolist/task/api/taskApi.types"

type Props = {
  todolist: TodolistDomain
}

export const Todolist = ({ todolist }: Props) => {
  const tasks = useAppSelector<TaskType[]>((state) => state.tasks[todolist.id])
  return (
    <div className={"todolist"}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span className={"todolistTitle"}>{todolist.title}</span>
        <button>X</button>
      </div>
      <div>
        <input />
        <button>+</button>
      </div>
      {tasks?.length ? (
        <ul>
          {tasks.map((task) => {
            return <Task key={task.id} task={task} />
          })}
        </ul>
      ) : (
        <span>Список задач пуст!</span>
      )}
      <div>
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
    </div>
  )
}
