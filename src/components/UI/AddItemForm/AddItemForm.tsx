import React, {ChangeEvent, FC, KeyboardEvent, memo, useCallback, useState} from 'react';
import {TextField} from "@mui/material";
import {MyButton} from "../MyButton";

type AddItemFormPropsType = {
     callback: (title: string) => void
}

export const AddItemForm: FC<AddItemFormPropsType> = memo(({callback}) => {
    const [newTitle, setNewTitle] = useState('')
    const [error, setError] = useState<string | null>(null)
    const buttonAddTaskStyle = {
        minHeight: '40px',
        maxHeight: '40px',
        minWidth: '40px',
        maxWidth: '40px',
        marginLeft: '10px'
    }

    const onClickCallbackHandler = useCallback(() => {
        if (newTitle.trim()) {
            callback(newTitle.trim())
            setNewTitle('')
        } else {
            setError('Title is required!')
        }
    }, [callback])
    const onChangeNewTitleHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (error) setError(null)
        setNewTitle(event.currentTarget.value)
    };
    const onKeyDownAddTaskHandler = (event: KeyboardEvent<HTMLDivElement>) => event.key === 'Enter' && onClickCallbackHandler()
    return (
        <div>
            <TextField
                variant={"outlined"}
                size={'small'}
                value={newTitle}
                onChange={onChangeNewTitleHandler}
                label={error ? error : 'Enter the task title...'}
                error={!!error}
                onKeyDown={onKeyDownAddTaskHandler}
            />
            <MyButton
                style={buttonAddTaskStyle}
                variant={'contained'}
                color={'primary'}
                title={'+'}
                onClick={onClickCallbackHandler}

            />
        </div>
    )
})