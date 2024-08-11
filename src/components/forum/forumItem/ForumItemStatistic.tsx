import React from 'react';
import {Box, Typography, useMediaQuery, useTheme} from '@mui/material';
import { styled } from '@mui/material/styles';

// Define styled components
const ContainerStyled = styled(Box)(({ theme }) => ({
    textAlign: 'center',
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('laptop')]: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: theme.spacing(0.5),
        padding: theme.spacing(0),
        marginLeft: theme.spacing(2)
    },

}));

const TitleText = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontWeight: 450,
    // fontSize: '0.875rem', // Equivalent to 14px for secondary text
    // [theme.breakpoints.down('tablet')]: {
    //     textAlign: 'right',
    // },
}));

const NumberText = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.primary,
    // fontSize: '1.3rem',
    fontWeight: 'regular',
}));

interface ForumStatisticProps {
    title: string;
    number: number;
}

// Component
const ForumItemStatistic: React.FC<ForumStatisticProps> = ({ title, number }) => {
    const theme = useTheme();
    const isSmallerThanLaptop = useMediaQuery(theme.breakpoints.down('laptop'));
    return (
        <ContainerStyled>
            {/*<TitleText variant={'body2'} sx={{color: 'neutral.main'}}>{title}</TitleText>*/}
            {/*<Box component={'span'} sx={{*/}
            {/*    display: {*/}
            {/*        mobile: 'inline',*/}
            {/*        laptop: 'none',*/}
            {/*    },*/}
            {/*}}>*/}
            {/*    :*/}
            {/*</Box>*/}
            {/*<NumberText variant={'body1'}>{number}</NumberText>*/}

            {( isSmallerThanLaptop ? (
                <React.Fragment>
                    <TitleText variant={'body2'}>
                        {title}:
                    </TitleText>
                    <NumberText variant={'body1'}>{number}</NumberText>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <TitleText variant={'body2'}>
                        {title}
                    </TitleText>
                    <NumberText variant={'body1'}>{number}</NumberText>
                </React.Fragment>
            ))}
        </ContainerStyled>


    );
};

export default ForumItemStatistic;