import React, {ChangeEvent, FC, useState} from 'react';
import {TextField} from "@mui/material";

type PropsType = {
    className: string
    title: string
    callback: (title: string) => void
}

export const EditableSpan: FC<PropsType> = ({className, title, callback}) => {
    const [edit, setEdit] = useState(false)
    const [newTitle, setNewTitle] = useState(title)

    const onChangeNewTitle = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewTitle(event.currentTarget.value)
    }
    const changeEdit = () => {
        if (edit) {
            callback(newTitle)
            setEdit(false)
        } else {
            setEdit(true)
        }
    }

    return (
        edit
            ? <TextField size={"small"} variant={'standard'} value={newTitle} onChange={onChangeNewTitle} onBlur={changeEdit} autoFocus/>
            : <span className={className} onDoubleClick={changeEdit}>{title}</span>
    )
}