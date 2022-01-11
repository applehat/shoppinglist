import React, { useState } from 'react'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { 
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import { deleteItem } from '../lib/api';

const DeleteItemButton = ({ id, mutate }) => {
    
    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
      setOpen(true);
    }

    const handleClose = () => {
      setOpen(false);
    }

    const handleDelete = async () => {
      console.log(`Confirmed delete of ${id}`)
      /*
      const { data } = await axios.delete(`http://localhost:3008/documents/${id}`)
      if (data.error) {
          console.error(data.error)
      } else {
          console.log(data.success)
          mutate('/documents')
      }*/
      await deleteItem(id)
      mutate()
      handleClose()
    }

    return (
      <div>
        <DeleteOutlineOutlinedIcon onClick={handleClickOpen}/>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          sx={{padding: '1rem'}}
        >
          <DialogTitle id="alert-dialog-title">
            {"Delete Item?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this item? This can not be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant="contained" color="button" onClick={handleDelete}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }

export default DeleteItemButton