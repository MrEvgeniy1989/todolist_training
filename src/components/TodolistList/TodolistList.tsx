import React from 'react';
import {Todolist} from "./Todolist/Todolist";
import {useAppSelector} from "../../store/store";
import {TodolistDomainType} from "../../store/types";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

export const TodolistList = () => {
    const todolists = useAppSelector<TodolistDomainType[]>(state => state.todolists)
    return (
        <div>
            <Grid container>
                {/*<AddItemForm callback={() => {}}/>*/}
            </Grid>
            <Grid container>
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