import React, { useState } from 'react'
import ItemDialog from './ItemDialog'
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import { updateItem } from '../lib/api'


const EditItemButton = ({ item, mutate }) => {
    const [open, setOpen] = useState(false)

    const handleSave = async (item) => {
        await updateItem(item._id, item)
        mutate()
        setOpen(false)
    }

    return (
      <>
        <ModeEditOutlinedIcon onClick={()=>{ setOpen(true) }}/>
        <ItemDialog 
            open={open}
            item={item} 
            handleClose={()=>{ setOpen(false) }} 
            handleSave={handleSave}
            />
      </>
    )
  }

export default EditItemButton