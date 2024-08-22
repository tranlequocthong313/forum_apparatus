import React, { useEffect, useState } from 'react';
import {
	Alert,
	Autocomplete,
	Box,
	Button,
	Card, CardActions, CardContent,
	Chip,
	Paper,
	Snackbar,
	TextField,
	Typography,
	useTheme
} from '@mui/material';
import CKEditorWrapper from '../components/ckeditor/CKEditorWrapper';
import { styled } from "@mui/material/styles";
import LoadingButton from "@mui/lab/LoadingButton";
import axios, { AxiosError } from "axios";
import CKContent from "../components/ckeditor/CKContent";
import { useLocation, useNavigate } from 'react-router-dom';
import { authAPIs, threadApis } from '../configs/api';
import { useUser } from '../hooks/useUser';
import { useAuth } from '../hooks/useAuth';

const BottomContainer = styled(Box)(({ theme }) => ({
	position: 'sticky',
	bottom: 0,
	backgroundColor: theme.palette.background.paper,
	padding: theme.spacing(2),
	borderTop: `1px solid ${theme.palette.divider}`,
	zIndex: 1,
	display: 'flex'
}))

interface PostButtonProps {
	onClick: () => void;
	isSubmitting: boolean;
}

const PostButton: React.FC<PostButtonProps> = ({ onClick, isSubmitting }) => {
	return (
		<BottomContainer>
			<LoadingButton
				color="primary"
				loading={isSubmitting}
				variant="contained"
				type={'submit'}
				sx={{ ml: 'auto', mr: 'auto' }}
				onClick={onClick}
			>
				<Typography variant={'button'}>
					{isSubmitting ? 'Posting...' : 'Post thread'}
				</Typography>
			</LoadingButton>
		</BottomContainer>
	);
};

interface PostData {
	content: string;
	title: string;
	threadCategory: number,
}

interface ValidationErrors {
	content?: string;
	title?: string;
}

const PostThread: React.FC = () => {
	const location = useLocation();
	const state = location.state as { threadCategory?: number };
	const threadCategory = state?.threadCategory;
	const navigate = useNavigate()
	const user = useUser()

	if (!threadCategory) {
		throw new Error("Thread Category Id must not be null")
	}

	const [postData, setPostData] = useState<PostData>({
		title: '',
		content: '',
		threadCategory,
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' })
	const [errors, setErrors] = useState<ValidationErrors>({});
	const [editor, setEditor] = useState<any>(null);

	const { handleOpenAuthModal } = useAuth()

	const handlePost = async () => {
		if (!user?.isLoggedIn) {
			return handleOpenAuthModal()
		}
		try {
			const res = await (await authAPIs()).post(threadApis.create, postData)
			if (res.status === 201) {
				navigate(`/threads/${res.data.id}`, { state: { thread: { ...res.data, user } } })
			}
		} catch (error) {
			console.error(error)
		}
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setPostData(prevState => ({
			...prevState,
			[name]: value
		}));
		if (errors[name as keyof ValidationErrors]) {
			setErrors(prevErrors => ({ ...prevErrors, [name]: undefined }));
		}
	}

	const handleEditorChange = (event: any, editor: any) => {
		const data = editor.getData();
		setPostData(prevState => ({
			...prevState,
			content: data
		}));

		if (errors.content) {
			setErrors(prevErrors => ({ ...prevErrors, content: undefined }));
		}
	}


	const validateForm = (): boolean => {
		const newErrors: ValidationErrors = {};
		if (postData.title.trim().length < 5) {
			newErrors.title = 'Tiêu đề phải có ít nhất 5 ký tự';
		}
		if (postData.content.trim().length < 100) {
			newErrors.content = 'Nội dung phải có ít nhất 100 ký tự';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		if (!validateForm()) {
			return;
		}

	}

	const handleCloseSnackbar = () => {
		setSnackbar(prev => ({ ...prev, open: false }))
	};

	return (
		<>
			<Card sx={{ overflow: 'unset' }}>
				<CardContent>

					<Box component='form' onSubmit={handleSubmit} sx={{ margin: 'auto', p: 2 }}>

						<TextField
							fullWidth
							margin="normal"
							label="Type your title"
							name='title'
							value={postData.title}
							onChange={handleInputChange}
							error={!!errors.title}
							helperText={errors.title}
							required
						/>


						<CKEditorWrapper
							data={postData.content}
							onChange={handleEditorChange}
							onReady={(editor: any) => {
								setEditor(editor);
							}}
						/>
						{errors.content &&
							<Box sx={{ color: 'error.main', fontSize: '0.75rem', mt: 0.5 }}>{errors.content}</Box>}

						<PostButton onClick={handlePost} isSubmitting={false} />
					</Box>
				</CardContent>

			</Card>

			<Snackbar
				open={snackbar.open}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
			>
				<Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
					{snackbar.message}
				</Alert>
			</Snackbar>
		</>
	);
};

export default PostThread;
