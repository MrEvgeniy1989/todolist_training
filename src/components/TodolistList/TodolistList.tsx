import React from 'react';
import {Todolist} from "./Todolist/Todolist";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {TodolistDomainType} from "../../store/types";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {AddItemForm} from "../UI/AddItemForm/AddItemForm";
import {addTodolistTC} from "../../store/reducers/todolistsReducer";

export const TodolistList = () => {
    const todolists = useAppSelector<TodolistDomainType[]>(state => state.todolists)
    const dispatch = useAppDispatch()

    const addTodolist = (title: string) => {
        dispatch(addTodolistTC(title))
    }

    return (
        <div>
            <Grid container justifyContent={'center'} margin={'20px 0'}>
                <AddItemForm callback={addTodolist}/>
            </Grid>
            <Grid container justifyContent={'center'}>
                {todolists.map(todolist => {
                    return (
                        <Grid item style={{margin: '20px'}} key={todolist.id}>
                            <Paper elevation={24} style={{padding: '20px'}}>
                                <Todolist
                                    todolistId={todolist.id}
                                    todolistTitle={todolist.title}
                                    filter={todolist.filter}
                                    entityStatus={todolist.entityStatus}
                                />
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>
        </div>
    )
}