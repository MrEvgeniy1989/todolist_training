import React, { ChangeEvent, FocusEvent, KeyboardEvent, useState } from "react"
import TextField from "@mui/material/TextField"

type Props = {
  title: string
  callback: (title: string) => void
  className?: string
}

export const EditableSpan = ({ callback, title, className }: Props) => {
  const [edit, setEdit] = useState(false)
  const [newTitle, setNewTitle] = useState(title)

  const onChangeNewTitleHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setNewTitle(e.currentTarget.value)
  const changeEdit = () => {
    if (edit) {
      if (newTitle !== title) {
        callback(newTitle)
      }
    }
    setEdit((prev) => !prev)
  }
  const onKeyDownChangeEditHandler = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      changeEdit()
    }
    if (e.key === "Escape") {
      setNewTitle(title)
      setEdit((prev) => !prev)
    }
  }
  const onFocusChangeEditHandler = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.select()
  }

  return edit ? (
    <TextField
      className={className}
      value={newTitle}
      variant={"standard"}
      onChange={onChangeNewTitleHandler}
      onBlur={changeEdit}
      onFocus={onFocusChangeEditHandler}
      onKeyDown={onKeyDownChangeEditHandler}
      autoFocus
    />
  ) : (
    <span className={className} onDoubleClick={changeEdit}>
      {title}
    </span>
  )
}
