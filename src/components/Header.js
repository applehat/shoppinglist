import React from "react"
import { AppBar, Toolbar, Typography } from '@mui/material'

const Header = () => {
    return (
        <AppBar position="static">
            <Toolbar variant="dense" >
            <Typography color="inherit" component="div" sx={{ fontFamily: 'Dosis', textTransform: 'uppercase', padding: '1rem' }}>
                Shopping List
            </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header