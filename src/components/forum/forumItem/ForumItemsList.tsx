import {Box} from "@mui/material";
import {ForumItemModel} from "../../types/forum";
import React from "react";
import ForumItem from "./ForumItem";


interface ForumItemsListProps {
    forums: ForumItemModel[];
}

const ForumItemsList: React.FC<ForumItemsListProps> = ({forums}) => {
    return (
        <Box sx={{ bgcolor: 'background.default', border: '1px solid', borderTop: '0px', borderColor: 'divider'}}>
            {forums.map((forum, index) => (
                <ForumItem key={forum.id} forum={forum} isLastItem={index === forums.length - 1} />
            ))}
        </Box>
    );
}

export default ForumItemsList;