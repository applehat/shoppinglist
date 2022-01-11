import { 
    Typography, 
    Stack, 
    Box, 
    Checkbox, 
    Grid, 
    Pagination
  } from '@mui/material'
import React from 'react'
import NewItemButton from './NewItemButton'
import EditItemButton from './EditItemButton'
import DeleteItemButton from './DeleteItemButton'
import { updateItem } from '../lib/api'

const ItemList = ({items, mutate, page, pages, setPageIndex}) => {    
    return (
        <>
        <Box mt={5} mb={2}>
            <Grid container spacing={3}>
            <Grid item xs={10}>
                <Typography variant="h6" sx={{fontWeight: 600}}>Your Items</Typography>
            </Grid>
            <Grid item xs={2}>
                <Box sx={{textAlign: 'right'}}>
                <NewItemButton  mutate={mutate} onSave={()=>{ console.log(`setting page index to ${pages}`); setPageIndex(pages) }}/>
                </Box>
            </Grid>
            </Grid>
        </Box>
        <Stack spacing={2}>
            {items.map(item => {
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
                        onChange={async (event) => { await updateItem(item._id, {complete: event.target.checked}); mutate() }}
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
                        <EditItemButton item={item} mutate={mutate} />
                        <DeleteItemButton id={item._id} mutate={mutate} />
                    </Stack>
                    </Grid>
                </Grid>
                </Box>
            )
            })}
        </Stack>
        <Grid mt={4} container alignContent="center" justifyContent="center">
            <Grid item xs={6}>
                <Pagination count={pages} size="large" variant="" page={page} onChange={(e, page)=>{ setPageIndex(page) }} />
            </Grid>
        </Grid>
      </>
    )
  }
export default ItemList