import { Grid, Box, Typography, Pagination, TextField, IconButton } from '@mui/material'
import React, { ChangeEvent, useEffect, useState } from 'react'
import APIs, { authAPIs, threadApis } from '../configs/api'
import ThreadItem from '../components/thread/ThreadItem'
import { ThreadState } from '../types'
import SplitButton from '../components/SplitButton'
import ForumCategoryHeader from '../components/forum/forumCategory/ForumCategoryHeader'
import HelpIcon from '@mui/icons-material/Help'
import { Facebook, LinkedIn, Reddit, Twitter } from '@mui/icons-material'
import { useLocation, useNavigate } from 'react-router-dom'

const Threads: React.FC = () => {
	const location = useLocation();
	const state = location.state as { title?: string, id?: number };
	const id = state?.id;
	const title = state?.title;
	const navigate = useNavigate()

	const [threads, setThreads] = useState<ThreadState[]>([])
	const [page, setPage] = useState(1)
	const [q, setQ] = useState('')

	useEffect(() => {
		loadThreads(page, q)
	}, [page, q])

	const loadThreads = async (page: number, q: string) => {
		if (page <= 0) {
			return
		}
		try {
			const url = `${threadApis.all}?page=${page}&q=${q}&category=${id}`
			const res = await APIs.get(url)
			if (res.status === 200) {
				setThreads(res.data)
			} else {
				console.error(res.data)
			}
		} catch (error) {
			console.error(error)
		}
	}

	const changePage = (event: ChangeEvent<unknown>, page: number) => {
		setPage(page)
	}

	const postThread = () => {
		navigate('/post-thread', { state: { threadCategory: id } })
	}

	return (
		<Grid container spacing={{ mobile: 1, tablet: 2, laptop: 3 }}>
			<Grid item laptop={8}>
				<ForumCategoryHeader title={title || 'Title'} />
				<Pagination onChange={changePage} count={10} variant="outlined" shape="rounded" sx={{ margin: '24px 0' }} />
				<Box sx={{ display: 'flex', alignItems: 'center' }} p={1}>
					<HelpIcon sx={{ color: 'action.active', mr: 1 }} fontSize="large" />
					<TextField
						margin="dense"
						id="searchThread"
						placeholder="Tiêu đề bài viết"
						type="text"
						fullWidth
						variant="outlined"
						onChange={(e) => setQ(e.target.value)}
					/>
				</Box>
				{threads.map((thread) => (
					<ThreadItem key={thread.id} thread={thread} />
				))}
				<Pagination onChange={changePage} count={10} variant="outlined" shape="rounded" sx={{ margin: '24px 0' }} />
			</Grid>

			<Grid item laptop={4}>
				<SplitButton onClick={postThread} />
				<Box sx={{ display: 'flex', alignItems: 'center', marginTop: '120px' }}>
					<Typography component="h6" sx={{ marginRight: 2 }}>
						Chia sẻ
					</Typography>
					<IconButton aria-label="share-facebook">
						<Facebook />
					</IconButton>
					<IconButton aria-label="share-twitter">
						<Twitter />
					</IconButton>
					<IconButton aria-label="share-linkedin">
						<LinkedIn />
					</IconButton>
					<IconButton aria-label="share-linkedin">
						<Reddit />
					</IconButton>
				</Box>
			</Grid>
		</Grid>
	)
}

export default Threads
