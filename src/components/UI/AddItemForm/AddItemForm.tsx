import React, {ChangeEvent, KeyboardEvent, FC, useState} from 'react';
import Button from "@mui/material/Button";
import {TextField} from "@mui/material";
import {useAppDispatch} from "../../../store/store";
import {setErrorAC} from "../../../store/reducers/appReducer";

type PropsType = {
    callback: (title: string) => void
}

export const AddItemForm: FC<PropsType> = ({callback}) => {
    const dispatch = useAppDispatch()
    const [title, setTitle] = useState<string>('')

    const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTitle(event.currentTarget.value)
    }
    const onClickAddItemHandler = () => {
        if (title.trim()) {
            callback(title.trim())
            setTitle('')
        } else {
            dispatch(setErrorAC('Имя задания не может быть пустым!'))
        }
    }
    const onKeyDownAddItemHandler = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            onClickAddItemHandler()
        }
    }

    const addButtonStyle = {minWidth: '40px', minHeight: '40px', maxWidth: '40px', maxHeight: '40px'}

    return (
        <div>
            <TextField
                size={"small"} value={title}
                onChange={onChangeTitleHandler}
                onKeyDown={onKeyDownAddItemHandler}
            />
            <Button
                variant={"contained"}
                style={addButtonStyle}
                onClick={onClickAddItemHandler}
            >
                +
            </Button>
        </div>
    )
}