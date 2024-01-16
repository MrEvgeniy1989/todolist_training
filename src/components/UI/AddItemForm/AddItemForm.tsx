import React from 'react';
import Button from "@mui/material/Button";
import {TextField} from "@mui/material";

export const AddItemForm = () => {
    return (
        <div>
            <TextField size={"small"}/>
            <Button variant={"contained"}
                    style={{minWidth: '40px', minHeight: '40px', maxWidth: '40px', maxHeight: '40px'}}
            >+</Button>
        </div>
    )
}