import React, {FC, memo, useCallback, useEffect, useMemo} from 'react';
import {FilterType, TaskStatuses, TaskType} from "./api/api";
import {useAppDispatch, useAppSelector} from "./store/store";
import {Task} from "./components/Task/Task";
import {addTaskTC, setTasksTC} from "./store/tasksReducer";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {deleteTodolistTC, updateTodolistFilterAC, updateTodolistTitleTC} from "./store/todolistsReducer";
import {EditableSpan} from "./components/EditableSpan/EditableSpan";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Delete from "@mui/icons-material/Delete";

type PropsType = {
    todolistId: string
    title: string
    filter: FilterType
}

export const Todolist: FC<PropsType> = memo(({todolistId, title, filter}) => {
    let tasks = useAppSelector<TaskType[]>(state => state.tasks[todolistId])
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setTasksTC(todolistId))
    }, []);

    const addTaskHandler = useCallback((title: string) => {
        dispatch(addTaskTC(todolistId, title))
    }, [dispatch, addTaskTC, todolistId])
    const onClickDeleteTodolistHandler = () => {
        dispatch(deleteTodolistTC(todolistId))
    }

    const updateTodolistTitleHandler = (title: string) => {
        dispatch(updateTodolistTitleTC(todolistId, title))
    };
    const onClickUpdateTodolistFilterOnAllHandler = () => dispatch(updateTodolistFilterAC(todolistId, 'all'));
    const onClickUpdateTodolistFilterOnActiveHandler = () => dispatch(updateTodolistFilterAC(todolistId, 'active'));
    const onClickUpdateTodolistFilterOnCompletedHandler = () => dispatch(updateTodolistFilterAC(todolistId, 'completed'));


    tasks = useMemo(()=> {
        let filteredTasks = tasks

        if (filter === 'active') {
            filteredTasks = tasks.filter(task => task.status === TaskStatuses.New)
        } else if (filter === 'completed') {
            filteredTasks = tasks.filter(task => task.status === TaskStatuses.Completed)
        }

        return filteredTasks
    }, [tasks, filter])
    return (
        <div className={'todolist'}>
            <h3>
                <EditableSpan title={title} callback={updateTodolistTitleHandler}/>
                <IconButton aria-label="delete" onClick={onClickDeleteTodolistHandler}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm callback={addTaskHandler}/>
            <ul>
                {tasks.map(task => {
                    return (
                        <Task key={task.id} todolistId={todolistId} task={task}/>
                    )
                })}
            </ul>
            <div>
                <Button onClick={onClickUpdateTodolistFilterOnAllHandler}
                        variant={filter === 'all' ? 'contained' : 'outlined'} color={'primary'}>All</Button>
                <Button onClick={onClickUpdateTodolistFilterOnActiveHandler}
                        variant={filter === 'active' ? 'contained' : 'outlined'} color={'secondary'}>Active</Button>
                <Button onClick={onClickUpdateTodolistFilterOnCompletedHandler}
                        variant={filter === 'completed' ? 'contained' : 'outlined'} color={'error'}>Completed</Button>
            </div>
        </div>
    )
})