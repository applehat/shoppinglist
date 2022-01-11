import React from "react";
import { Stack, Box, Grid } from '@mui/material'
import NewItemButton from "./NewItemButton";

const NoItems = ({mutate}) => {
    return (
        <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={8}>
                <Box mt={5} mb={2} sx={{border: '1px solid #C6C6C6', textAlign: 'center', padding: '100px 0', borderRadius: '5px'}}>
                    <Stack spacing={2}>
                    <Box component="div" sx={{fontSize: '18px', color: '#87898C'}}>
                        {`Your shopping list is empty :(`}
                    </Box>
                    <Box component="div">
                        <NewItemButton buttonText={`Add your first item`} mutate={mutate}/>
                    </Box>
                    </Stack>
                </Box>
            </Grid>
        </Grid>
    )
}

export default NoItems