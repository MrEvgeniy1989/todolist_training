import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type FilterType = 'all' | 'active' | 'completed'

type TodolistType = {
    id: string
    todoTitle: string
    filter: FilterType
}

export const App = () => {

    const todolistId1 = crypto.randomUUID()
    const todolistId2 = crypto.randomUUID()

    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId1, todoTitle: "Что изучить", filter: 'all'},
        {id: todolistId2, todoTitle: "Что купить", filter: 'all'},
    ])
    const [tasks, setTasks] = useState({
        [todolistId1]: [
            {id: crypto.randomUUID(), taskTitle: "HTML", isDone: true},
            {id: crypto.randomUUID(), taskTitle: "CSS", isDone: true},
            {id: crypto.randomUUID(), taskTitle: "JS", isDone: true},
            {id: crypto.randomUUID(), taskTitle: "React", isDone: false},
            {id: crypto.randomUUID(), taskTitle: "Redux", isDone: false}
        ],
        [todolistId2]: [
            {id: crypto.randomUUID(), taskTitle: "Milk", isDone: true},
            {id: crypto.randomUUID(), taskTitle: "Chocolate", isDone: false},
            {id: crypto.randomUUID(), taskTitle: "Bread", isDone: true},
            {id: crypto.randomUUID(), taskTitle: "Butter", isDone: true},
            {id: crypto.randomUUID(), taskTitle: "Banana", isDone: false}
        ]
    })

    return (
        <div className="App">
            <Todolist/>
        </div>
    );
}