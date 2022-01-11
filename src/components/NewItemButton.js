import React, { useState } from 'react'
import ItemDialog from './ItemDialog'
import Button from '@mui/material/Button'
import { createItem } from '../lib/api';

const NewItemButton = ({buttonText, mutate, onSave}) => {
    const [open, setOpen] = useState(false)


    const handleSave = async (item) => {
        await createItem({
            ...item,
            complete: false
        })
        mutate()
        if (onSave) {
            onSave()
        }
        setOpen(false)
    }

    return (
        <>
            <Button variant="contained" color="button" onClick={()=>{ setOpen(true) }}>{buttonText || 'Add Item'}</Button>
            <ItemDialog 
                open={open} 
                handleClose={()=>{ setOpen(false) }} 
                handleSave={handleSave}
                />
        </>
    )
}

export default NewItemButton