import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import React from "react";
import * as Icons from '@mui/icons-material';
import { useNavigate } from "react-router-dom";

const iconMap: { [key: string]: React.ElementType } = {
	messageRoundedIcon: Icons.MessageRounded,
}

interface TitleWithIconProps {
	id: number;
	icon?: string;
	title: string;
	fontSize?: 'inherit' | 'small' | 'medium' | 'large';
	color?: 'inherit' | 'primary' | 'secondary' | 'action' | 'disabled' | 'error';
}

const ContainerStyled = styled(Box)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',

	backgroundColor: theme.palette.background.default,
}));

const Title = styled(Typography)(({ theme }) => ({
	fontSize: '1rem',
	marginLeft: theme.spacing(1),
	whiteSpace: 'nowrap',
	[theme.breakpoints.down('laptop')]: {
		display: 'none',
	}
}));

const ForumItemTitle: React.FC<TitleWithIconProps> = ({ icon = 'messageRoundedIcon', title, id, fontSize = 'large', color = 'neutral.main' }) => {
	const IconComponent = iconMap[icon] || Icons.MessageRounded;
	const navigate = useNavigate();

	const handleClick = () => {
		navigate('/threads', { state: { title, id } });
	};

	return (
		<ContainerStyled onClick={handleClick} style={{ cursor: 'pointer' }}>
			<IconComponent sx={{ mr: 1, color: `${color}` }} fontSize={fontSize} />
			<Title variant={'subtitle1'} sx={{ color: 'primary.main' }}>{title}</Title>
		</ContainerStyled>
	);
}

export default ForumItemTitle;
