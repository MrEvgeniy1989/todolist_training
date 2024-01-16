import React, {useEffect} from 'react';
import './App.css';
import {TodolistList} from "../TodolistList/TodolistList";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {getTodolists} from "../../store/reducers/todolistsReducer";
import ButtonAppBar from "../UI/ButtonAppBar/ButtonAppBar";
import Container from "@mui/material/Container";
import LinearProgress from "@mui/material/LinearProgress";
import {RequestStatusType} from "../../store/types";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../Login/Login";


export const App = () => {
    const status = useAppSelector<RequestStatusType>(state => state.app.status)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getTodolists())
    }, [dispatch]);

    return (
        <div className="App">
            <ButtonAppBar/>
            {status === 'loading' && <LinearProgress color="secondary"/>}
            <Container fixed>
                <Routes>
                    <Route path={'*'} element={<Navigate to={'/404'}/>}/>
                    <Route path={'/404'} element={<h1 style={{textAlign: 'center'}}>Page not found 404</h1>}/>
                    <Route path={'/'} element={<TodolistList/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                </Routes>
            </Container>
        </div>
    );
}