import React, {ChangeEvent, FC, memo, useState} from 'react';
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    className?: string
    title: string
    callback: (newTitle: string) => void
}

export const EditableSpan: FC<EditableSpanPropsType> = memo(({className, title, callback}) => {
    const [editMode, setEditMode] = useState(false)
    const [newTitle, setNewTitle] = useState(title)

    const onChangeNewTitleHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setNewTitle(e.currentTarget.value)

    const onBlurNewTitleHandler = () => {
        callback(newTitle)
        setEditMode(false)
    };
    return (
        editMode
            ? <TextField value={newTitle} onBlur={onBlurNewTitleHandler} onChange={onChangeNewTitleHandler} autoFocus/>
            : <span className={className} onDoubleClick={() => setEditMode(true)}>{title}</span>

    )
})