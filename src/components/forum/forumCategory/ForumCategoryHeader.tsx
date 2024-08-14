import {Box, Typography} from "@mui/material";
import React from "react";

interface ForumCategoryHeaderProps {
    title: string;
}

const ForumCategoryHeader: React.FC<ForumCategoryHeaderProps> = ({title}) => {
    return (
        <Box sx={{ bgcolor: 'neutral.main', p: 2, borderRadius: '4px 4px 0 0', border: '1px solid', borderColor: 'divider'}}>
            <Typography variant='h6' sx={{ color: 'primary.contrastText'}}>
                {title}
            </Typography>
        </Box>
    );
}

export default ForumCategoryHeader;