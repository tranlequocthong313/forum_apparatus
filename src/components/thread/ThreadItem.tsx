import React from 'react'
import { Avatar, Box, Typography, Link, IconButton } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock'
import StickyNote2Icon from '@mui/icons-material/StickyNote2'
import { ThreadState } from '../../types'

interface ThreadItemProps {
  thread: ThreadState
}

const ThreadItem: React.FC<ThreadItemProps> = ({ thread }) => {
  return (
    <Box display="flex" alignItems="center" className="structItem">
      <Box className="structItem-cell structItem-cell--icon">
        <Avatar src={thread.user.avatar} alt={thread.user.fullName} />
      </Box>
      <Box flex={1} className="structItem-cell structItem-cell--main">
        <Box display="flex" alignItems="center">
          <LockIcon className="structItem-status structItem-status--locked" titleAccess="Locked" />
          <StickyNote2Icon className="structItem-status structItem-status--sticky" titleAccess="Sticky" />
        </Box>
        <Typography variant="h6">
          <Link>{thread.title}</Link>
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Link>{thread.user.fullName}</Link>
          <Link>
            <Typography variant="caption">{thread.createdAt}</Typography>
          </Link>
        </Box>
      </Box>
      <Box className="structItem-cell structItem-cell--meta">
        <Typography variant="body2">Replies: 69</Typography>
        <Typography variant="body2">Views: 69</Typography>
      </Box>
      <Box className="structItem-cell structItem-cell--latest">
        <Link>
          <Typography variant="caption">{thread.updatedAt}</Typography>
        </Link>
        <Link>
          <Typography variant="body2">{thread.user.fullName}</Typography>
        </Link>
      </Box>
      <Box className="structItem-cell structItem-cell--icon structItem-cell--iconEnd">
        <IconButton component="a" sx={{ backgroundColor: 'red', color: 'blue' }}>
          <Avatar>{thread.user.avatar}</Avatar>
        </IconButton>
      </Box>
    </Box>
  )
}

export default ThreadItem
