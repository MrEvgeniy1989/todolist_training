import React, {ChangeEvent, KeyboardEvent, FC, useState, memo} from 'react';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

type PropsType = {
    callback: (title: string) => void
}

export const AddItemForm: FC<PropsType> = memo(({callback}) => {
    const [newTitle, setNewTitle] = useState('')
    const [error, setError] = useState('')

    const callbackHandler = () => {
        if (newTitle.trim()) {
            callback(newTitle.trim())
            setNewTitle('')
        } else {
            setError('Title is required!')
        }
    }

    const onChangeNewTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
    };
    const onKeyDownAddItemHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            callbackHandler()
        }
    }
    const buttonAddStyle = {
        minHeight: '40px',
        minWidth: '40px',
        maxHeight: '40px',
        maxWidth: '40px',
        marginLeft: '10px'
    }

    return (
        <div>
            <TextField
                label={error ? error : 'Enter title...'}
                error={!!error}
                value={newTitle}
                onChange={onChangeNewTitleHandler}
                onKeyDown={onKeyDownAddItemHandler}
                variant={'outlined'}
                size={'small'}
            />
            <Button
                onClick={callbackHandler}
                variant={'contained'}
                style={buttonAddStyle}
            >+</Button>
        </div>
    )
})