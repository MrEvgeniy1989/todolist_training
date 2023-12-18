import React, {memo, useCallback} from 'react';
import './App.css';
import {Todolist} from "../Todolist/Todolist";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {addTodolistAC, TodolistType} from "../../store/todolistsReducer";
import {AddItemForm} from "../UI/AddItemForm/AddItemForm";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {ButtonAppBar} from "../UI/ButtonAppBar";

export const App = memo(() => {
    const todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)
    const dispatch = useDispatch()

    const addTodolistHandler = useCallback((newTitle: string) => dispatch(addTodolistAC(newTitle)), [dispatch, addTodolistAC])

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container>
                <Grid container style={{margin: '20px 0'}}>
                    <AddItemForm callback={addTodolistHandler}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(todolist => {
                        return (
                            <Grid item key={todolist.todolistId}>
                                <Paper elevation={24} style={{padding: "15px"}}>
                                    <Todolist todolistId={todolist.todolistId}
                                              todolistTitle={todolist.todolistTitle} filter={todolist.filter}/>
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
})