import React from 'react';
import { Box, IconButton } from '@mui/material';

interface FloatingBubbleProps {
	icon: React.ReactNode;
	link: string;
}

const FloatingBubble: React.FC<FloatingBubbleProps> = ({ icon, link }) => {
	return (
		<Box
			sx={{
				position: 'fixed',
				bottom: 32,
				right: 32,
				zIndex: 1000,
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<IconButton
				component="a"
				href={link}
				target="_blank"
				rel="noopener noreferrer"
				sx={{
					color: '#ffffff',
					'&:hover': {
						opacity: 0.8
					},
				}}
			>
				{icon}
			</IconButton>
		</Box>
	);
};

export default FloatingBubble;
