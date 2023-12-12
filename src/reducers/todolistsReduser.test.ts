import {v1} from "uuid";
import {TodolistType} from "../App";
import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC,
    deleteTodolistAC,
    todolistsReducer
} from "./todolistsReducer";

test('correct todolist should be remove', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()
    const startState: TodolistType[] = [
        {todolistId: todolistId1, todolistTitle: "Что изучить", filter: 'all'},
        {todolistId: todolistId2, todolistTitle: "Что купить", filter: 'all'},
    ]

    const endState = todolistsReducer(startState, deleteTodolistAC(todolistId1))

    expect(endState.length).toBe(startState.length - 1)
    expect(endState[0].todolistId).toBe(todolistId2)
})
test('A new todolist should be added.', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()
    const startState: TodolistType[] = [
        {todolistId: todolistId1, todolistTitle: "Что изучить", filter: 'all'},
        {todolistId: todolistId2, todolistTitle: "Что купить", filter: 'all'},
    ]

    const newTodolistId = v1()

    const endState = todolistsReducer(startState, addTodolistAC(newTodolistId, 'new todolist'))

    expect(endState.length).toBe(startState.length + 1)
    expect(endState[0].todolistId).toBe(newTodolistId)
    expect(endState[0].todolistTitle).toBe('new todolist')
})
test('The title of the correct todolist should change.', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()
    const startState: TodolistType[] = [
        {todolistId: todolistId1, todolistTitle: "Что изучить", filter: 'all'},
        {todolistId: todolistId2, todolistTitle: "Что купить", filter: 'all'},
    ]

    const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId1, 'new Title'))

    expect(endState.length).toBe(startState.length)
    expect(endState[0].todolistId).toBe(todolistId1)
    expect(endState[0].todolistTitle).toBe('new Title')
})
test('The filter of the correct todolist should change.', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()
    const startState: TodolistType[] = [
        {todolistId: todolistId1, todolistTitle: "Что изучить", filter: 'all'},
        {todolistId: todolistId2, todolistTitle: "Что купить", filter: 'all'},
    ]

    const endState = todolistsReducer(startState, changeFilterAC(todolistId1, 'active'))

    expect(endState[0].filter).toBe('active')
    expect(endState[1].filter).toBe(startState[1].filter)
})