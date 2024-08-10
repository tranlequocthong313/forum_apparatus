import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

// Define styled components
const Container = styled(Box)(({ theme }) => ({
    textAlign: 'center',
    padding: theme.spacing(2),
}));

const TitleText = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontSize: '0.875rem', // Equivalent to 14px for secondary text
}));

const NumberText = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.primary,
    fontSize: '1.3rem',
    fontWeight: 'regular',
}));

interface ForumStatisticProps {
    title: string;
    number: number;
}

// Component
const ForumStatistic: React.FC<ForumStatisticProps> = ({ title, number }) => {
    return (
        <Container>
            <TitleText>{title}</TitleText>
            <NumberText>{number}</NumberText>
        </Container>
    );
};

export default ForumStatistic;