import React, { ChangeEvent, useState } from "react"
import TextField from "@mui/material/TextField"

type Props = {
  title: string
  callback: (title: string) => void
}

export const EditableSpan = ({ callback, title }: Props) => {
  const [edit, setEdit] = useState(false)
  const [newTitle, setNewTitle] = useState(title)

  const onChangeNewTitleHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setNewTitle(e.currentTarget.value)
  const changeEdit = () => {
    if (edit) {
      callback(newTitle)
    }
    setEdit(!edit)
  }
  return edit ? (
    <TextField value={newTitle} onChange={onChangeNewTitleHandler} onBlur={changeEdit} autoFocus />
  ) : (
    <span onDoubleClick={changeEdit}>{title}</span>
  )
}
