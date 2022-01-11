import React, { useEffect, useState } from 'react'
import { 
    Typography, 
    Box, 
    Checkbox, 
    Grid, 
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    FormControlLabel,
    MenuItem,
  } from '@mui/material'
import LastPageIcon from '@mui/icons-material/LastPage';

const ItemDialog = ({ open, handleClose, handleSave, item }) => {
    const [name, setName] = useState(item?.name || '')
    const [description, setDescription] = useState(item?.description || '')
    const [count, setCount] = useState(item?.count || 1)
    const [complete, setComplete] = useState(item?.complete || false)

    const [nameError, setNameError] = useState(false)
    const [descriptionError, setDescriptionError] = useState(false)

    const saveData = {count, name, description, complete}
    if (item?._id) {
      saveData._id = item._id
    }

    useEffect(() => {
      if (name.length) {
        setNameError(false)
      }
      if (description.length) {
        setDescriptionError(false)
      }
    })

    const handleClickSave = () => {
      let err = false;
      if (!name.length) {
        setNameError(true)
        err = true
      }
      if (!description.length) {
        setDescriptionError(true)
        err = true
      }
      if (!err) {
        handleSave(saveData)
      }
    }

    return (
      <Dialog open={open} onClose={handleClose} PaperProps={{ style: { borderRadius: 0, borderBottom: '5px solid #4D81B7', minHeight: '768px' } }}>
        <DialogTitle sx={{
          background: '#FAFAFA', 
          fontWeight: '600', 
          color: '#5C6269', 
          borderBottom: '1px solid #D5DFE9', 
          fontFamily: 'Dosis', 
          textTransform: 'uppercase',
          fontSize: '18px'}}>
        <Grid container alignContent="center" alignItems="center">
          <Grid item xs={11}>
            Shopping List 
          </Grid>
          <Grid item xs={1}>
            <Box sx={{textAlign: 'right', paddingTop: '2px'}}>
              <LastPageIcon sx={{color: '#5C6269'}}/>
            </Box>
          </Grid>
        </Grid>
          
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{color: "#000", padding: '20px 0'}}>
            {item ? (
              <>
                <Typography sx={{ fontSize: '18px' }}>Edit an Item</Typography>
                Edit your item below
              </>
            ) : (
              <>
               <Typography sx={{ fontSize: '18px' }}>Add an Item</Typography>
                Add your new item below
              </>
            )}
          </DialogContentText>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { margin: '10px 0' },
              }}
              noValidate
              autoComplete="off"
            >
            <TextField
              id="name"
              label="Item Name"
              fullWidth
              variant="outlined"
              value={name}
              error={nameError}
              helperText={nameError ? "Please enter a name" : ""}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              multiline
              id="description"
              label="Description"
              fullWidth
              variant="outlined"
              minRows={3}
              value={description}
              error={descriptionError}
              helperText={descriptionError ? "Please enter a description" : `${description.length}/100`}
              FormHelperTextProps={!descriptionError ? {
                style: {
                  position: 'absolute',
                  bottom: '5px',
                  right: '0px',
                }
              } : {}}
              onChange={(e) => setDescription(e.target.value)}
              inputProps={{ maxLength: 100 }}
            />
            <TextField
              variant="outlined"
              fullWidth
              id="howmany"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              select
              label="How Many"
            >
              {[...Array(10).keys()].map(i => (
                <MenuItem key={`menuitem${i+1}`} value={i+1}>{i+1}</MenuItem>
              ))}
            </TextField>
            {item && (
              <FormControlLabel control={<Checkbox  
                checked={complete}
                onChange={(e) => setComplete(e.target.checked)}
              />} label="Purchased" />
            )}
            </Box>
      

        </DialogContent>
        <DialogActions sx={{padding: '20px'}}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" color="button" onClick={handleClickSave}>{item ? "Save Item" : "Add Task"}</Button>
        </DialogActions>
      </Dialog>
    )
  }

  export default ItemDialog