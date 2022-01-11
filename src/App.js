import { 
  Container, 
  Alert,
  AlertTitle,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import axiosClient from './lib/axiosClient';
import useSWR from 'swr'
import ItemList from './components/ItemList';
import LoadingIndicator from './components/LoadingIndicator';
import Header from './components/Header'
import NoItems from './components/NoItems';

const fetcher = url => axiosClient.get(url).then(res => res.data)


/**
 * Main App component
 * @return {JSX.Element}
 */
function App() {

  const itemsPerPage = 5;
  const [pageIndex, setPageIndex] = useState(1);
  const { data, error, mutate, isValidating } = useSWR(`/documents?page=${pageIndex}&perPage=${itemsPerPage}`, fetcher)
 
  const totalItems = data?.total || 0;
  const totalPages = Math.ceil( totalItems / itemsPerPage );
 
  useEffect(()=>{
    // if we delete everything on a page, we need to go back a page
    if (data && !data?.result?.length && pageIndex > 1) {
      setPageIndex(totalPages);
    }
  })
  
  return (
    <div className="App">
      <Header />
      {isValidating && ( <LoadingIndicator /> )}
      <Container fixed sx={{paddingTop: "20px"}}>
        {error && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        )}
        {data?.result?.length ? (
          <ItemList 
            items={data?.result || []} 
            mutate={mutate}
            setPageIndex={setPageIndex}
            page={pageIndex} 
            pages={totalPages}/>
        ) : (
          <>
            {!isValidating && (
              <NoItems mutate={mutate} />
            )}
          </>
        )}
      </Container>
    </div>
  );
}

export default App;
