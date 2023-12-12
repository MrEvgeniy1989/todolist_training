import React, {ChangeEvent, FC, useState} from 'react';
import TextField from "@mui/material/TextField";

type PropsType = {
    title: string
    callback: (value: string) => void
}

export const EditableSpan: FC<PropsType> = ({title, callback}) => {
    const [editMode, setEditMode] = useState(false)

    const changeEditMode = () => {
        setEditMode(!editMode)
    }
    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        callback(event.currentTarget.value)
    }

    return (
        editMode
            ? <TextField value={title} onChange={onChangeInputHandler} onBlur={changeEditMode} autoFocus/>
            : <span onDoubleClick={changeEditMode}>{title}</span>

    )
}