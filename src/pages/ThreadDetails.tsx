import { Avatar, Box, Button, Container, Divider, Grid, Icon, Pagination, Paper, Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import React, { ChangeEvent, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import CKEditorWrapper from "../components/ckeditor/CKEditorWrapper";
import LoadingButton from "@mui/lab/LoadingButton";
import ReplyIcon from '@mui/icons-material/Reply';
import { useLocation, useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { ParentReplyState, ReplyState, ThreadState } from "../types";
import APIs, { authAPIs, replyApis } from "../configs/api";
import { useUser } from "../hooks/useUser";
import CKContent from "../components/ckeditor/CKContent";
import { useAuth } from "../hooks/useAuth";

interface ThreadMetaProps {
	threadTitle: string;
	createdBy: string;
	postDate: string;
}

const ThreadMetadata: React.FC<any> = ({ createdBy, postDate }) => {
	return (
		<Box sx={{ display: 'flex', alignItems: 'center', gap: 2, color: 'text.secondary' }}>
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
				<PersonIcon fontSize="small" sx={{ mr: 0.5 }} />
				<Typography variant="body2">
					{createdBy}
				</Typography>

			</Box>
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
				<AccessTimeIcon fontSize="small" sx={{ mr: 0.5 }} />
				<Typography variant="body2">{postDate}</Typography>
			</Box>

		</Box>
	)
}


interface CommentProps {
	id: number;
	username: string;
	role: string;
	avatarUrl: string;
	commentTime: string;
	content: string;
	parentComment?: ParentReplyState;
	onClickReplyButton?: () => void;
}


const ReplyBox: React.FC<any> = ({ username, avatarUrl, onPost }) => {
	const [reply, setReply] = useState("")

	const handleEditorChange = (value: any, editor: any) => {
		setReply(value)
	}

	const handleClick = () => {
		onPost(reply)
	}

	return (
		<>
			<Paper elevation={3} sx={{
				display: 'flex',
				gap: 2,
				marginBottom: 2,
			}}>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						bgcolor: "background.default",
						p: 2,
						justifyContent: 'flex-start',
						alignItems: 'center',
						flex: 1.5
					}}
				>
					<Avatar src={avatarUrl} alt={username} sx={{
						width: 64, height: 64
					}} />
					<Typography variant="body1" sx={{
						color: 'primary.main',
						fontWeight: 500,
						lineHeight: 2,
						letterSpacing: '0.5px',
						textAlign: 'center',
						wordBreak: 'break-word',
						hyphens: 'auto',
						overflowWrap: 'break-word',
					}} component="span">
						{username}
					</Typography>
				</Box>

				<Box
					sx={{ flex: '10.5', py: 2, pr: 2, minWidth: 0, position: 'relative', display: 'flex', flexDirection: 'column', gap: 2, justifyContent: 'flex-end' }}
				>
					<Divider sx={{
						visibility: 'hidden',
						marginY: 1,
						'&::after': {
							content: '""',
							position: 'absolute',
							left: 0,
							border: '10px solid transparent',
							borderRightColor: 'background.paper',
							transform: 'translate(calc(-16px - 100%), -50%)',
							width: 0,
							height: 0,
							display: 'block',
							visibility: 'visible',
						}

					}}

					/>
					<CKEditorWrapper
						editorProps={{
							'& .ck-editor__main > .ck-editor__editable': {
								minHeight: '150px',
								overflow: 'hidden'
							},
						}}
						containerProps={{
							display: 'block',
							width: '100%'
						}}

						data={""}
						onChange={handleEditorChange}
						onReady={(editor: any) => {
						}}
					/>


					<LoadingButton
						onClick={handleClick}
						color="primary"
						variant="contained"
						// type={'submit'}
						size='small'
						sx={{ ml: 'auto', flex: 1, left: 0 }}
						startIcon={<ReplyIcon />}
					>
						<Typography variant={'button'}>
							Post reply
						</Typography>
					</LoadingButton >
				</Box>



			</Paper>

		</>
	)
}

const Comment: React.FC<CommentProps> = ({ id, username, role, avatarUrl, commentTime, content, onClickReplyButton, parentComment }) => {
	return (
		<Paper elevation={3} sx={{
			display: 'flex',
			gap: 2,
			marginBottom: 2,
		}}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					bgcolor: "background.default",
					p: 2,
					justifyContent: 'flex-start',
					alignItems: 'center',
					flex: 1.5
				}}
			>
				<Avatar src={avatarUrl} alt={username} sx={{
					width: 64, height: 64
				}} />
				<Typography variant="body1" sx={{
					color: 'primary.main',
					fontWeight: 500,
					lineHeight: 2,
					letterSpacing: '0.5px',
					textAlign: 'center',
					wordBreak: 'break-word',
					hyphens: 'auto',
					overflowWrap: 'break-word',
				}} component="span">
					{username}
				</Typography>
				<Typography variant="body1" sx={{
					textAlign: 'center',
				}} component="span">
					{role}
				</Typography>
			</Box>

			<Box
				sx={{ flex: 10.5, py: 2, pr: 2, position: 'relative', }}
			>
				<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 1 }}>
					<Typography variant="body2" color="textSecondary">
						{commentTime}
					</Typography>
					<Typography variant="body2" color="textSecondary">
						#{id}
					</Typography>
				</Box>
				<Divider sx={{
					marginY: 1,
					'&::after': {
						content: '""',
						position: 'absolute',
						left: 0,
						border: '10px solid transparent',
						borderRightColor: 'background.paper',
						transform: 'translate(calc(-16px - 100%), -50%)',
						width: 0,
						height: 0,
						display: 'block'
					}

				}}
				/>
				{parentComment &&
					<Box
						sx={{
							borderLeft: '2px solid',
							borderColor: 'primary.main',
							backgroundColor: 'grey.100',
							padding: '8px',
						}}
					>
						<Typography
							variant="body1"
							sx={{
								fontWeight: 'bold',
								letterSpacing: '0.5px',
								wordBreak: 'break-word',
								hyphens: 'auto',
								overflowWrap: 'break-word',
							}}
							component="span"
						>
							{parentComment.user.username}
						</Typography>
						<CKContent content={parentComment.content} />
					</Box>
				}

				<Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
					<CKContent content={content} />
					{onClickReplyButton &&
						<Box sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }} onClick={onClickReplyButton}>
							<ReplyIcon color="primary" />
							<Typography variant="body1" color="primary">
								Reply
							</Typography>
						</Box>
					}
				</Box>
			</Box>

		</Paper>
	)
}


const ThreadHeader: React.FC<ThreadMetaProps> = ({ createdBy, postDate, threadTitle }) => {
	return (
		<Container
			sx={{
				pb: 2
			}}
		>
			<Typography
				variant={'h5'}
				color={'primary.main'}
				gutterBottom
				sx={{
					mb: 2,
					fontWeight: 500,
					lineHeight: 1.5,
					letterSpacing: '0.5px'
				}}
			>
				{threadTitle}
			</Typography>
			<ThreadMetadata createdBy={createdBy} postDate={postDate} />
		</Container>
	)
}


function ThreadDetails() {
	const location = useLocation();
	const state = location.state as { thread: ThreadState };
	const thread = state.thread
	const { id } = useParams()
	const createdAtAgo = formatDistanceToNow(new Date(thread.createdAt), { addSuffix: true })
	const userRoles: { [key: string]: string } = {
		"ROLE_ADMIN": "Quản trị viên",
		"ROLE_WORKER": "Nhân viên",
		"ROLE_USER": "Thành viên",
	}
	const [reply, setReply] = useState<undefined | ReplyState>(undefined)
	const [replies, setReplies] = useState<ReplyState[]>([])
	const [page, setPage] = useState(1)
	const { handleOpenAuthModal } = useAuth()

	const user = useUser()

	const repliedTime = (date: number) => {
		return formatDistanceToNow(new Date(date), { addSuffix: true })
	}

	useEffect(() => {
		loadReplies(page)
	}, [page])

	const loadReplies = async (page: number) => {
		if (page <= 0) {
			return
		}
		try {
			const url = `${replyApis.all}?page=${page}&threadid=${id}`
			const res = await APIs.get(url)
			if (res.status === 200) {
				setReplies(res.data)
			}
		} catch (error) {
			console.error(error)
		}
	}

	const changePage = (event: ChangeEvent<unknown>, page: number) => {
		setPage(page)
	}

	const onPost = async (replyContent: string) => {
		if (!user?.isLoggedIn) {
			return handleOpenAuthModal()
		}
		try {
			const res = await (await authAPIs()).post(replyApis.create, {
				content: replyContent,
				thread: id,
				reply: reply && reply.id
			})
			if (res.status === 201) {
				setReplies(prev => [...prev, {
					...res.data,
					thread,
					user,
					reply
				}])
			}
		} catch (error) {
			console.error(error)
		} finally {
			setReply(undefined)
		}
	}

	return (
		<>
			<ThreadHeader
				threadTitle={thread.title}
				postDate={createdAtAgo}
				createdBy={thread.user.username}
			/>

			<Pagination onChange={changePage} count={10} variant="outlined" shape="rounded" sx={{ margin: '24px 0' }} />

			{page === 1 && <Comment
				id={1}
				username={thread.user.username}
				role={userRoles[thread.user.userRole]}
				avatarUrl={thread.user.avatar}
				commentTime={repliedTime(thread.createdAt)}
				content={thread.content}
			/>}

			{replies.map((reply, index) =>
				<Comment
					key={reply.id}
					id={index + 2}
					username={reply.user.username}
					role={userRoles[thread.user.userRole]}
					avatarUrl={reply.user.avatar}
					commentTime={repliedTime(reply.createdAt)}
					content={reply.content}
					onClickReplyButton={() => setReply(reply)}
					parentComment={reply.reply}
				/>
			)}

			<Pagination onChange={changePage} count={10} variant="outlined" shape="rounded" sx={{ margin: '24px 0' }} />

			{reply &&
				<Comment
					id={reply.id}
					username={reply.user.username}
					role={userRoles[thread.user.userRole]}
					avatarUrl={reply.user.avatar}
					commentTime={repliedTime(reply.createdAt)}
					content={reply.content}
				/>
			}
			<ReplyBox onPost={onPost} username={user?.username} avatarUrl={user?.avatar} />

		</>

	)
		;
}

export default ThreadDetails;
