import { TodolistDomain } from "features/todolistList/api/todolistApi.types"
import { useAppSelector } from "common/hooks/useAppSelector"
import { Task } from "features/todolistList/todolist/task/ui/Task/Task"
import { TaskType } from "features/todolistList/todolist/task/api/taskApi.types"
import Delete from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"
import Button from "@mui/material/Button"
import { AddItemForm } from "common/components/AddItemForm/AddItemForm"
import { TaskStatuses } from "common/enums/enums"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { todolistsActions } from "features/todolistList/model/todolistsSlice"
import { memo, useMemo } from "react"
import { tasksActions } from "features/todolistList/todolist/task/model/tasksSlice"

type Props = {
  todolist: TodolistDomain
}

export const Todolist = memo(({ todolist }: Props) => {
  let tasks = useAppSelector<TaskType[]>((state) => state.tasks[todolist.id])
  const dispatch = useAppDispatch()

  const onClickAddTaskHandler = (title: string) => dispatch(tasksActions.addTask({ todolistId: todolist.id, title }))

  const setTodolistFilterAll = () =>
    dispatch(todolistsActions.changeTodolistFilter({ todolistId: todolist.id, filter: "all" }))
  const setTodolistFilterActive = () =>
    dispatch(todolistsActions.changeTodolistFilter({ todolistId: todolist.id, filter: "active" }))
  const setTodolistFilterCompleted = () =>
    dispatch(todolistsActions.changeTodolistFilter({ todolistId: todolist.id, filter: "completed" }))

  tasks = useMemo(() => {
    let filteredTasks = tasks
    if (todolist.filter === "active") {
      filteredTasks = filteredTasks.filter((task) => task.status !== TaskStatuses.Completed)
    } else if (todolist.filter === "completed") {
      filteredTasks = filteredTasks.filter((task) => task.status !== TaskStatuses.New)
    }
    return filteredTasks
  }, [tasks, todolist.filter])

  return (
    <div className={"todolist"}>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <span className={"todolistTitle"}>{todolist.title}</span>
        <IconButton title={"Удалить список задач"}>
          <Delete />
        </IconButton>
      </div>
      <AddItemForm callback={onClickAddTaskHandler} />
      {tasks?.length ? (
        <ul>
          {tasks.map((task) => {
            return <Task key={task.id} todolistId={todolist.id} task={task} />
          })}
        </ul>
      ) : (
        <span>Список задач пуст!</span>
      )}
      <div>
        <Button variant={todolist.filter === "all" ? "contained" : "outlined"} onClick={setTodolistFilterAll}>
          All
        </Button>
        <Button
          variant={todolist.filter === "active" ? "contained" : "outlined"}
          onClick={setTodolistFilterActive}
          color={"success"}
        >
          Active
        </Button>
        <Button
          variant={todolist.filter === "completed" ? "contained" : "outlined"}
          onClick={setTodolistFilterCompleted}
          color={"secondary"}
        >
          Completed
        </Button>
      </div>
    </div>
  )
})
