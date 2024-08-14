import {Avatar, ListItem, ListItemAvatar, ListItemText, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import React from "react";


const TitleText = styled(Typography)(({theme}) => ({
    fontSize: '0.875rem',
    fontWeight: 450,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
}))


const SecondaryText = styled(Typography)(({ theme }) => ({
    fontSize: '0.75rem',
    color: theme.palette.text.secondary,
}));

interface LatestThreadItemProps {
    avatarSrc?: string;
    title: string;
    time: string;
    author: string;
}

const ListItemStyled = styled(ListItem)(({ theme }) => ({
    [theme.breakpoints.down('tablet')]: {
        paddingTop: 0,
        paddingBottom: 0
    }
}))

const LatestThreadItem: React.FC<LatestThreadItemProps> = ({ avatarSrc, title, time, author }) => {
    return (
        <ListItemStyled>
            <ListItemAvatar  sx={{
                display: {
                    laptop: 'block',
                    tablet: 'none',
                    mobile: 'none'
                },
            }}>
                <Avatar src={avatarSrc}/>
            </ListItemAvatar>
            <ListItemText
                primary={<TitleText>{title}</TitleText>}
                secondary={
                    <SecondaryText>
                        {time} · {author}
                    </SecondaryText>
                }
            />
        </ListItemStyled>
    );
}
export default LatestThreadItem;