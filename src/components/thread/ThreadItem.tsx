import React from 'react'
import { Box, Avatar, Link, Typography, IconButton } from '@mui/material'
import LatestThreadItem from '../forum/forumItem/ForumLatestThread'
import { formatDistanceToNow } from 'date-fns'

interface ThreadItemProps {
  thread: {
    user: {
      avatar: string
      fullName: string
    }
    title: string
    createdAt: string
    updatedAt: string
  }
}

const ThreadItem: React.FC<ThreadItemProps> = ({ thread }) => {
  const createdAtAgo = formatDistanceToNow(new Date(thread.createdAt), { addSuffix: true })
  const updatedAtAgo = formatDistanceToNow(new Date(thread.updatedAt), { addSuffix: true })

  return (
    <Box
      className="structItem"
      sx={{
        bgcolor: 'background.default',
        border: '1px solid',
        borderTop: '0px',
        borderColor: 'divider',
        display: 'flex',
        alignItems: 'center',
        padding: 2,
      }}
    >
      <Box className="structItem-cell structItem-cell--latest" sx={{ flex: 4 }}>
        <LatestThreadItem
          avatarSrc={thread.user.avatar}
          title={thread.title}
          time={updatedAtAgo}
          author={thread.user.fullName}
        />
      </Box>
      <Box
        className="structItem-cell structItem-cell--meta"
        sx={{
          flex: 1,
          textAlign: 'center',
          fontSize: '1.25rem',
          fontWeight: 'bold',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
          <Typography variant="subtitle1" sx={{ marginRight: '8px' }}>
            Trả lời:
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            69
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body1" sx={{ marginRight: '8px' }}>
            Lượt xem:
          </Typography>
          <Typography variant="body1">69</Typography>
        </Box>
      </Box>
      <Box
        className="structItem-cell structItem-cell--icon structItem-cell--iconEnd"
        sx={{
          flex: 2,
          marginLeft: '16px',
          display: 'flex',
          justifyContent: 'right',
          alignItems: 'center',
        }}
      >
        <Box sx={{ marginRight: 1 }}>
          <Typography component="h6">{createdAtAgo}</Typography>
          <Typography variant="caption">{thread.user.fullName}</Typography>
        </Box>
        <IconButton component="a">
          <Avatar sx={{ width: 24, height: 24 }} src={thread.user.avatar} alt={thread.user.fullName} />
        </IconButton>
      </Box>
    </Box>
  )
}

export default ThreadItem
