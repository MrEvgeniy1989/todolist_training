import React, {FC, memo} from 'react';
import Button, {ButtonProps} from "@mui/material/Button";

interface MyButtonPropsType extends ButtonProps {
}

export const MyButton: FC<MyButtonPropsType> = memo(({
                                                         title,
                                                         variant,
                                                         color,
                                                         onClick,
                                                         ...props
                                                     }) => {

    return (
        <Button
            variant={variant}
            color={color}
            onClick={onClick}
            {...props}
        >{title}
        </Button>
    )
})