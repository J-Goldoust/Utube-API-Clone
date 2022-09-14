import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { TYpography, Box, Stack, Typography } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import { CheckCircle } from '@mui/icons-material';
import { Videos } from './';
import { fetchFromAPI } from '../utils/fetchFromAPI';

const VideoDetail = () => {

  const [videoDetail, setVideoDetail] = useState(null)
  const [videos, setVideos] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
      .then((data)=> setVideoDetail(data.items[0]))

      fetchFromAPI(`search?.part=snippet&relatedToVideoId=${id}&type=video`)
      .then((data)=> setVideos(data.items))
  }, [id])

  const error = 
  <Box display='flex' sx={{ backgroundColor: '#fff', width: '50%'}} alignItems='center' p={2} borderRadius='10px'>
    <ErrorIcon sx={{ color: 'red', paddingRight: '5px' }} />
     <Typography sx={{ color: 'red' }} display='inline-block'> Connecting to the Server...</Typography>
  </Box>

  if(!videoDetail?.snippet) return error

  console.log(videoDetail)

  const { snippet: { title, channelId, channelTitle }, statistics: { viewCount, likeCount } } = videoDetail

  return (
    <Box minHeight='95vh'>
      <Stack direction={{ xs: 'column', md: 'row' }}>
        <Box flex={1}>
          <Box sx={{ width: '100%', position: 'sticky', top: '86px'}}>

            <ReactPlayer 
              url={`https://youtube.com/watch?v=${id}`} 
              className='react-player'
              controls
            />

            <Typography color='#fff' variant='h6' fontWeight='bold' p={2}>
              {title}
            </Typography>

            <Stack direction='row' justifyContent='space-between' sx={{ color: '#fff' }} px={2} py={1}>

              <Link to={`/channel/${channelId}`}>
                <Typography variant={{ sm: 'subtitle2', md: 'subtitle1' }} color='#fff' >
                  {channelTitle}
                  <CheckCircle sx={{ fontSize:'14px', color:'gray', ml:'5px' }} />
                </Typography>
              </Link>

              <Stack direction='row' gap='20px' alignItems='center' >
                <Typography variant='body2' sx={{ opacity: 0.8 }}>
                  {parseInt(viewCount).toLocaleString()} Views
                </Typography>
                <Typography variant='body2' sx={{ opacity: 0.8 }}>
                  {parseInt(likeCount).toLocaleString()} Likes
                </Typography>
              </Stack>

            </Stack>
          </Box>
        </Box>

        <Box px={2} py={{ md:1, xs: 5 }} justifyContent='center' alignItems='center' >
          <Box position='sticky' top='75px' backgroundColor='#000' py={2} width='100%'>
          <Typography color='#fff' variant='h6' fontWeight='bold'>
              Related Videos:
          </Typography>
          </Box>
          <Videos videos={videos} direction='column' />
        </Box>

      </Stack>
    </Box>
  )
}

export default VideoDetail