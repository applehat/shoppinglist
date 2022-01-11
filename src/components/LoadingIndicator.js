import React from 'react';
import { CircularProgress, Grid } from '@mui/material'

const LoadingIndicator = () => {
    return (
        <Grid container mt={10} mb={10} justifyContent="center" sx={{position: 'fixed', zIndex: '999999999'}}>
          <Grid item xs={1}>
            <CircularProgress size={90}/>
          </Grid>
        </Grid>
    )
}

export default LoadingIndicator