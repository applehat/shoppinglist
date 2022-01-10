import { 
  AppBar, 
  Toolbar, 
  Typography, 
  CircularProgress, 
  Container, 
  Stack, 
  Box, 
  Checkbox, 
  Grid, 
  Alert,
  AlertTitle,
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
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import React, { useEffect, useState } from 'react'
import axios from 'axios';


/**
 * Main App component
 * @return {JSX.Element}
 */
function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([])
  const [error, setError] = useState(false)

  const fetchItems = async () =>{
    // groq query for fetching data
    const query = `
    *[_type=="item"]{
      _id,
      name,
      description,
      complete,
      count
    }`
    setLoading(true)
    try {
      const {data: response} = await axios.get(`http://localhost:3008/documents?query=${encodeURIComponent(query)}`)
      setData(response?.result || [])
      setError(response?.error || false)
    } catch (error) {
      setError(error.message)
      console.error(error.message)
    }
    setLoading(false);
  }

  const handleResponse = (data) => {
    if (data.error) {
      console.error(data.error)
      setError(data.error)
    } else {
      console.log(data.success)
      fetchItems()
    }
  }

  const deleteItem = async (id) => {
    console.log(`Deleting item ${id}`)
    try {
      const { data } = await axios.delete(`http://localhost:3008/documents/${id}`)
      handleResponse(data)
    } catch (error) {
      console.error(error.message)
    }
  }

  const updateItem = async (id, patch) => {
    console.log(`Updating item ${id}`)
    try {
      const { data } = await axios.patch(`http://localhost:3008/documents/${id}`, patch)
      handleResponse(data)
    } catch (error) {
      console.error(error.message)
    }
  }

  const createItem = async (newItem) => {
    console.log(`Creating new item`)
    if (!newItem._type) {
      newItem._type = 'item'
    }
    try {
      const { data } = await axios.post(`http://localhost:3008/documents`, newItem)
      handleResponse(data)
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);


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
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Shopping List</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{color: "#000"}}>
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
              helperText={descriptionError ? "Please enter a description" : ""}
              onChange={(e) => setDescription(e.target.value)}
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
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
            </TextField>
            {item && (
              <FormControlLabel control={<Checkbox  
                checked={complete}
                onChange={(e) => setComplete(e.target.checked)}
              />} label="Purchased" />
            )}
      

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" color="button" onClick={handleClickSave}>{item ? "Save Item" : "Add Task"}</Button>
        </DialogActions>
      </Dialog>
    )
  }

  const NewItemButton = () => {
    const [open, setOpen] = useState(false)

    const handleSave = (item) => {
      createItem({
        ...item,
        complete: false
      })
      setOpen(false)
    }

    return (
      <>
      <Button variant="contained" color="button" onClick={()=>{ setOpen(true) }}>Add Item</Button>
      <ItemDialog 
        open={open} 
        handleClose={()=>{ setOpen(false) }} 
        handleSave={handleSave}
        />
      </>
    )
  }

  const EditItemButton = ({ item }) => {
    const [open, setOpen] = useState(false)

    const handleSave = (item) => {
      updateItem(item._id, item)
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


  const DeleteButton = ({ id }) => {
    const [open, setOpen] = React.useState(false)

    const handleClickOpen = () => {
      setOpen(true);
    }

    const handleClose = () => {
      setOpen(false);
    }

    const handleDelete = () => {
      console.log(`Confirmed delete of ${id}`)
      deleteItem(id)
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

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar variant="dense" >
          <Typography color="inherit" component="div" sx={{ fontFamily: 'Dosis', textTransform: 'uppercase', padding: '1rem' }}>
            Shopping List
          </Typography>
        </Toolbar>
      </AppBar>
      <Container fixed sx={{paddingTop: "20px"}}>
      {loading && (
        <Grid container mt={10} justifyContent="center">
          <Grid item xs={1}>
            <CircularProgress size={90}/>
          </Grid>
        </Grid>
      )}
      {error && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      )}
      {!loading && !error && (
        <>
        <Box mt={5} mb={2}>
          <Grid container spacing={3}>
            <Grid item xs={10}>
              <Typography variant="h6" sx={{fontWeight: 600}}>Your Items</Typography>
            </Grid>
            <Grid item xs={2}>
              <Box sx={{textAlign: 'right'}}>
                <NewItemButton />
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Stack spacing={2}>
          {data.map(item => {
            let boxStyle = {border: '0.5px solid #D5DFE9', borderRadius: '4px'}
            if (item.complete) {
              boxStyle = {background: 'rgba(213, 223, 233, 0.17)', textDecoration: 'line-through', ...boxStyle}
            }
            return (
              <Box component="div" key={item._id} sx={boxStyle}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={1} sx={{textAlign: 'center'}}>
                    <Checkbox
                      checked={item.complete}
                      onChange={(event) => { updateItem(item._id, {complete: event.target.checked}) }}
                      sx={{ '& .MuiSvgIcon-root': { fontSize: 24 }}}
                      />
                  </Grid>
                  <Grid item xs={10}>
                    <Box component="div" sx={{margin: '24px 0px'}}>
                      <Stack spacing={1}>
                        <Box component="div" sx={{fontWeight: 600, fontSize: '16px'}}>
                          {item.name}
                        </Box>
                        <Box component="div" sx={{fontWeight: 400, fontSize: '14px'}}>
                          {item.description} {item.count > 1 && `(${item.count} items)`}
                        </Box>
                      </Stack>
                    </Box>
                  </Grid>
                  <Grid item xs={1} alignContent="center">
                    <Stack spacing={1} direction="row">
                      <EditItemButton item={item} />
                      <DeleteButton id={item._id}/>
                    </Stack>
                  </Grid>
                </Grid>
              </Box>
            )
          })}
        </Stack>
        </>
      )}
      </Container>
    </div>
  );
}

export default App;
