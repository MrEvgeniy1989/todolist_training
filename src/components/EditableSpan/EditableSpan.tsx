import React, {ChangeEvent, FC, useState} from 'react';
import TextField from "@mui/material/TextField";

type PropsType = {
    title: string
    callback: (title: string) => void
    classNameForSpan?: string
}

export const EditableSpan: FC<PropsType> = ({title, callback, classNameForSpan}) => {
    const [editMode, setEditMode] = useState(false)
    const [newTitle, setNewTitle] = useState(title)

    const onChangeNewTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
    };

    const changeEditMode = () => {
        if (editMode) {
            callback(newTitle)
            setEditMode(false)
        } else {
            setEditMode(true)
        }
    }
    return (
        editMode
            ? <TextField value={newTitle} onChange={onChangeNewTitleHandler} onBlur={changeEditMode} autoFocus variant={'standard'}/>
            : <span onDoubleClick={changeEditMode} className={classNameForSpan}>{title}</span>
    )
}