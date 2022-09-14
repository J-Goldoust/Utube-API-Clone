import { Stack, Box, Typography } from '@mui/material';
import {VideoCard, ChannelCard} from './';
import ErrorIcon from '@mui/icons-material/Error';

const Videos = ({ videos, direction }) => {

  const error = 
    <Box display='flex' sx={{ backgroundColor: '#fff', width: '50%'}} alignItems='center' p={2} borderRadius='10px'>
      <ErrorIcon sx={{ color: 'red', paddingRight: '5px' }} />
       <Typography sx={{ color: 'red' }} display='inline-block'>Connecting to the Server...</Typography>
    </Box>
  
  if(!videos?.length) return error;

  return (
    <Stack direction={direction || 'row'} flexWrap='wrap' justifyContent='center' gap={2}>

      {videos.map((item, index) => (
        <Box key={index}>
          {item.id.videoId && <VideoCard video={item} />}
          {item.id.channelId && <ChannelCard channelDetail={item} />}
        </Box>
      ))}

    </Stack>
  )
}

export default Videos