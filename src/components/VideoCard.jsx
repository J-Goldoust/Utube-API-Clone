import { Link } from 'react-router-dom';
import { Typography, Card, CardContent, CardMedia } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { demoVideoUrl, demoChannelUrl, demoVideoTitle, demoChannelTitle } from '../utils/constants';
import { useEffect, useState } from 'react';
import { fetchFromAPI } from '../utils/fetchFromAPI';


const VideoCard = ({ video: { id: { videoId }, snippet } }) => {


  return (
    <Card sx={{ width:{ xs: '250px', sm: '356px', md: '320px' }, boxShadow: 'none', border: 'none'}}>

      <Link to={ videoId ? `/video/${videoId}` : demoVideoUrl }>
        <CardMedia 
          image={ snippet?.thumbnails?.high?.url }
          alt={ snippet?.title }
          sx={{ width: { xs: '250px', sm: '356px', md: '320px' }, height:180 }}
        />
      </Link>

      <CardContent sx={{ backgroundColor: '#1e1e1e', height: '100px' }}>

      <Link to={ videoId ? `/video/${videoId}` : demoVideoUrl }>
        <Typography variant='subtitle1' fontWeight='bold' color='#fff'>
          {snippet?.title.slice(0, 60) || demoVideoTitle.slice(0, 60) }
        </Typography>
      </Link>

      <Link to={ snippet?.channelId ? `/channels/${snippet?.channelId}` : demoChannelUrl }>
        <Typography variant='subtitle2' fontWeight='bold' color='gray'>
          {snippet?.channelTitle || demoChannelTitle }
          <CheckCircle sx={{ fontSize: 12, color: 'gray', ml: '5px' }} />
        </Typography>
      </Link>

      </CardContent>
    </Card>
  )
}

export default VideoCard