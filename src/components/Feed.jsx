import { useState, useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { Sidebar, Videos } from './';
import { fetchFromAPI } from '../utils/fetchFromAPI';

const Feed = () => {

  const [selectedCategory, setSelectedCategory] = useState('New')
  const [videos, setVideos] = useState([])


  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`)
      .then((data) => setVideos(data.items))
  }, [selectedCategory])

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
          Copyright 2022 J.G
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
          {selectedCategory} <span style={{ color: '#F31503' }}>Videos</span>
        </Typography>

        <Videos videos={videos} />

      </Box>
    </Stack>
  )
}

export default Feed