import { AppBar, Toolbar, Typography, CircularProgress, Container, Stack, Box, Checkbox, Grid } from '@mui/material'
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

  useEffect(() => {
    const fetchData = async () =>{
      // groq query for fetching data
      const query = `
      *[_type=="item"]{
        _id,
        name,
        description,
        complete
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
    fetchData();
  }, []);

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar variant="dense" >
          <Typography variant="h6" color="inherit" component="div">
            Shopping List
          </Typography>
        </Toolbar>
      </AppBar>
      <Container fixed>
      {loading && (<CircularProgress />)}
      {error && (<div>There was an error: {error}</div>)}
      {!loading && !error && (
        <Stack spacing={2}>
          {data.map(item => {
            console.log(item)
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
                      onChange={() => { console.log(checked) }}
                      sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }}
                      />
                  </Grid>
                  <Grid item xs={10}>
                    <Box component="div" sx={{margin: '24px 0px'}}>
                      <Stack spacing={1}>
                        <Box component="div" sx={{fontWeight: 600, fontSize: '16px'}}>
                          {item.name}
                        </Box>
                        <Box component="div" sx={{fontWeight: 400, fontSize: '14px'}}>
                          {item.description}
                        </Box>
                      </Stack>
                    </Box>
                  </Grid>
                  <Grid item xs={1}>
                    <Stack spacing={2} direction="row">
                      <ModeEditOutlinedIcon/>
                      <DeleteOutlineOutlinedIcon/>
                    </Stack>
                  </Grid>
                </Grid>
              </Box>
            )
          })}
        </Stack>
      )}
      
      </Container>
    </div>
  );
}

export default App;
