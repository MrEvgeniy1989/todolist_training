import React, {useEffect} from 'react';
import './App.css';
import {TodolistList} from "../TodolistList/TodolistList";
import {useAppDispatch, useAppSelector} from "../../store/store";
import ButtonAppBar from "../UI/ButtonAppBar/ButtonAppBar";
import Container from "@mui/material/Container";
import LinearProgress from "@mui/material/LinearProgress";
import {RequestStatusType} from "../../store/types";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../Login/Login";
import {ErrorSnackbar} from "../UI/ErrorSnackbar/ErrorSnackbar";
import {meTC} from "../../store/reducers/authReducer";
import {CircularProgress} from "@mui/material";


export const App = () => {
    const status = useAppSelector<RequestStatusType>(state => state.app.status)
    const isInitialized = useAppSelector<boolean>(state => state.app.isInitialized)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(meTC())
    }, []);

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div className="App">
            <ErrorSnackbar/>
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