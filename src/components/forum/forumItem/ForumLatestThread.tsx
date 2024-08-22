import { Avatar, Box, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { formatDistanceToNow } from 'date-fns'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ThreadState } from '../../../types'
import { ForumItemModel } from '../../types/forum'

const TitleText = styled(Typography)(({ theme }) => ({
	fontSize: '0.875rem',
	fontWeight: 450,
	whiteSpace: 'normal',
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	wordWrap: 'break-word',
	display: '-webkit-box',
	WebkitLineClamp: 2,
	WebkitBoxOrient: 'vertical',
}))

const SecondaryText = styled(Typography)(({ theme }) => ({
	fontSize: '0.75rem',
	color: theme.palette.text.secondary,
}))

interface LatestThreadItemProps {
	thread: ThreadState
	route: () => string
}

const ListItemStyled = styled(ListItem)(({ theme }) => ({
	[theme.breakpoints.down('tablet')]: {
		paddingTop: 0,
		paddingBottom: 0,
	},
}))

const ThreadSummaryItem: React.FC<LatestThreadItemProps> = ({ thread, route }) => {
	const createdAtAgo = formatDistanceToNow(new Date(thread.createdAt), { addSuffix: true })
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(route(), { state: { thread } });
	};

	return (
		<ListItemStyled>
			<ListItemAvatar
				sx={{
					display: {
						laptop: 'block',
						tablet: 'none',
						mobile: 'none',
					},
				}}
			>
				<Avatar src={thread.user.avatar} />
			</ListItemAvatar>
			<Box>
				<ListItemText style={{ cursor: 'pointer' }} onClick={handleClick} primary={<TitleText>{thread.title}</TitleText>} />
				<ListItemText
					primary={
						<SecondaryText>
							{createdAtAgo} · {thread.user.username}
						</SecondaryText>
					}
				/>
			</Box>
		</ListItemStyled>
	)
}
export default ThreadSummaryItem
