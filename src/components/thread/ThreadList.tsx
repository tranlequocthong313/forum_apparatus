import { Box, ListItemText, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import React, { useEffect, useState } from 'react'
import { authAPIs, threadApis } from '../../configs/api'
import ThreadItem from './ThreadItem'
import { ThreadState } from '../../types'

const ForumItemTitle = styled(ListItemText)(({ theme }) => ({
  '& .MuiListItemText-primary': {
    fontWeight: 'bold',
  },
  '& .MuiListItemText-secondary': {
    color: theme.palette.text.secondary,
  },
}))

const HeaderContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  padding: theme.spacing(2),
}))

const ThreadList: React.FC = () => {
  const [threads, setThreads] = useState<ThreadState[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadThreads(page)
  }, [page])

  const loadThreads = async (_page: number) => {
    if (_page <= 0) {
      return
    }
    try {
      setLoading(true)
      const url = `${threadApis.all}?page=${_page}`
      const res = await (await authAPIs()).get(url)
      if (res.status === 200) {
        setThreads(res.data)
      } else {
        console.error(res.data)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <HeaderContainer>
      <Typography variant={'h5'}>THREAD</Typography>
      {threads.map((thread) => (
        <ThreadItem thread={thread} />
      ))}
    </HeaderContainer>
  )
}

export default ThreadList
