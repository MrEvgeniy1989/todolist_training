import { ChangeEvent, KeyboardEvent, useState } from "react"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { appActions } from "app/appSlice"

type Props = {
  callback: (title: string) => void
}

export const AddItemForm = ({ callback }: Props) => {
  const dispatch = useAppDispatch()
  const [newTitle, setNewTitle] = useState("")

  const styleAddButton = {
    minHeight: "40px",
    minWidth: "40px",
    maxHeight: "40px",
    maxWidth: "40px",
    marginLeft: "10px",
  }

  const onChangeNewTitleHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewTitle(e.currentTarget.value)
  }
  const onClickAddItemHandler = () => {
    if (newTitle.trim()) {
      callback(newTitle.trim())
      setNewTitle("")
    } else {
      dispatch(appActions.setAppError({ error: "Название не может быть пустым!" }))
    }
  }
  const onKeyDownAddItemHandler = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      onClickAddItemHandler()
    }
  }

  return (
    <div>
      <TextField
        size={"small"}
        placeholder={"Новая задача..."}
        value={newTitle}
        onChange={onChangeNewTitleHandler}
        onKeyDown={onKeyDownAddItemHandler}
      />
      <Button variant={"contained"} style={styleAddButton} onClick={onClickAddItemHandler}>
        +
      </Button>
    </div>
  )
}
