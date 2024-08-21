import {Box} from "@mui/material";
import ForumCategoryHeader from "./ForumCategoryHeader";
import {ForumCategoryModel} from "../../../types/forum";
import React from "react";
import ForumItemsList from "../forumItem/ForumItemsList";
import {styled} from "@mui/material/styles";


const ForumContainer = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(3),
    // borderRadius: '4px',
    // border: `1px solid ${theme.palette.divider}`
}));

const ForumCategory: React.FC<{category: ForumCategoryModel}> = ({category}) => {
    return (
        // <Box sx={{ mb: 3, borderRadius: 1, border: 1}}>
        <ForumContainer>
            <ForumCategoryHeader title={category.title} />
            <ForumItemsList forums={category.forums}/>
        </ForumContainer>

        // </Box>
    )
}

export default ForumCategory;