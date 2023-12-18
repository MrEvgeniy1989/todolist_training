import React, {FC, memo, useCallback, useMemo} from 'react';
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    deleteTodolistAC,
    FilterType
} from "../../store/todolistsReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {addTasksAC, TaskType} from "../../store/tasksReducer";
import {Task} from "../Task/Task";
import {MyButton} from "../UI/MyButton";
import Delete from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import {AddItemForm} from "../UI/AddItemForm/AddItemForm";
import {EditableSpan} from "../UI/EditableSpan/EditableSpan";

type TodolistPropsType = {
    todolistId: string
    todolistTitle: string
    filter: FilterType
}

export const Todolist: FC<TodolistPropsType> = memo(({todolistId, todolistTitle, filter}) => {
    let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[todolistId])
    const dispatch = useDispatch()
    const addTaskHandler = useCallback((newTitle: string) => dispatch(addTasksAC(todolistId, newTitle)), [dispatch, addTasksAC, todolistId])
    const deleteTodolistHandler = () => {
        dispatch(deleteTodolistAC(todolistId))
    }

    const changeFilterToAll = useCallback(() => dispatch(changeTodolistFilterAC(todolistId, 'all')), [dispatch, changeTodolistFilterAC, todolistId])
    const changeFilterToActive = useCallback(() => dispatch(changeTodolistFilterAC(todolistId, 'active')), [dispatch, changeTodolistFilterAC, todolistId])
    const changeFilterToCompleted = useCallback(() => dispatch(changeTodolistFilterAC(todolistId, 'completed')), [dispatch, changeTodolistFilterAC, todolistId])

    let filteredTasks = tasks
    tasks = useMemo(() => {
        if (filter === 'active') {
            filteredTasks = tasks.filter(t => !t.isDone)
        } else if (filter === 'completed') {
            filteredTasks = tasks.filter(t => t.isDone)
        }
        return filteredTasks
    }, [filter, tasks])

    const changeTodolistTitle = useCallback((newTitle: string) => dispatch(changeTodolistTitleAC(todolistId, newTitle)), [dispatch, changeTodolistTitleAC, todolistId])

    return (
        <div className={'todolist'}>
            <div style={{display: "flex", justifyContent: 'space-between', alignItems: 'center'}}>
                <EditableSpan className={'todolistTitle'} title={todolistTitle}
                              callback={(newTitle) => changeTodolistTitle(newTitle)}/>
                <IconButton onClick={deleteTodolistHandler}>
                    <Delete/>
                </IconButton>
            </div>

            <AddItemForm callback={addTaskHandler}/>

            {tasks.length
                ? <ul>{tasks.map(task => <Task key={task.taskId} todolistId={todolistId} task={task}/>)}</ul>
                : <span>Your todolist is empty!</span>
            }
            <div>
                <MyButton variant={filter === 'all' ? 'contained' : 'outlined'} title={'All'} color={'primary'}
                          onClick={changeFilterToAll}/>
                <MyButton variant={filter === 'active' ? 'contained' : 'outlined'} title={'Active'} color={'success'}
                          onClick={changeFilterToActive}/>
                <MyButton variant={filter === 'completed' ? 'contained' : 'outlined'} title={'Completed'}
                          color={'secondary'} onClick={changeFilterToCompleted}/>
            </div>
        </div>
    )
})