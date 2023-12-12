import React, {ChangeEvent, KeyboardEvent, FC, useState} from 'react';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

type PropsType = {
    callback: (title: string) => void
}

export const AddItemForm: FC<PropsType> = ({callback}) => {

    const [newTitle, setNewTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const styleButton = {
        minHeight: '40px',
        minWidth: "40px",
        maxHeight: '40px',
        maxWidth: "40px",
        marginLeft: "10px"
    }

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewTitle(event.currentTarget.value)
    }

    const onClickHandler = () => {
        if (newTitle.trim()) {
            callback(newTitle.trim())
            setNewTitle('')
        } else {
            setError("Название не может быть пустым!")
        }
    }
    const onKeyDownHandler = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            onClickHandler()
        }
    }

    return (
        <div>
            <TextField
                label={error ? error : 'Введите название...'}
                variant={'outlined'}
                size={"small"}
                value={newTitle}
                onChange={onChangeInputHandler}
                error={!!error}
                onKeyDown={onKeyDownHandler}
            />

            <Button
                variant={'contained'}
                style={styleButton}
                onClick={onClickHandler}
            >+</Button>
        </div>
    )
}