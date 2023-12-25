import React, {memo, useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {useAppDispatch, useAppSelector} from "./store/store";
import {addTodolistTC, setTodolistsTC} from "./store/todolistsReducer";
import {TodolistDomainType, TodolistType} from "./api/api";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ButtonAppBar from "./components/ButtonAppBar/ButtonAppBar";


export const App = memo(() => {

    const todolists = useAppSelector<TodolistDomainType[]>(state => state.todolists)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setTodolistsTC())
    }, []);

    const addTodolistHandler = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch, addTodolistTC])

    return (
        <div className="App">
            <ButtonAppBar/>

            <Container fixed>
                <Grid container style={{margin: "20px 0", justifyContent: 'center'}}>
                    <AddItemForm callback={addTodolistHandler}/>
                </Grid>

                <Grid container spacing={3}>
                    {todolists.map(todolist => {
                        return (
                            <Grid item key={todolist.id}>
                                <Paper elevation={24} style={{padding: '20px'}}>
                                    <Todolist
                                        todolistId={todolist.id}
                                        title={todolist.title}
                                        filter={todolist.filter}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
})