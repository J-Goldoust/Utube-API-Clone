import { useState, useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { Videos, Sidebar } from './';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import { useNavigate, useParams } from 'react-router-dom';

const SearchFeed = () => {

  const [selectedCategory, setSelectedCategory] = useState('')
  const [searchedVideos, setSearchedVideos] = useState([])
  const [videos, setVideos] = useState([])
  const { searchTerm } = useParams()


  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${searchTerm}`)
      .then((data) => setSearchedVideos(data.items))

      // fetchFromAPI(`search?part=snippet&q=${selectedCategory}`)
      // .then((data) => setVideos(data.items))
  }, [searchTerm, selectedCategory])


  return (
    <Stack sx={{ flexDirection: { sx: 'column', md: 'row' } }}>
      <Box sx={{ height: { sx: 'auto', md: '88vh'}, borderRight: '1px solid #3b3b3b', px: { sx: 0, md: 2 }, overflowY: 'hidden' }}>
        
        <Sidebar 
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <Typography
          className='copyright'
          sx={{ mt: '7px', color: '#fff' }}
          variant='body2'
        >
          Copyright 2022
        </Typography>
        
      </Box>

      <Box
      p={2}
      sx={{ overflowY: 'scroll', height: '80vh', flex: 2 }}
      >
      <Typography
        variant='h4'
        fontWeight='bold'
        mb={2}
        sx={{ color: '#fff' }}
      >
        Search Results for: <span style={{ color: '#F31503' }}>{searchTerm}</span>
      </Typography>

      <Videos videos={ searchedVideos } />

      </Box>
    </Stack>
  )
}

export default SearchFeed