import { Box } from "@mui/material";
import ForumCategoryHeader from "./ForumCategoryHeader";
import { ForumCategoryModel } from "../../types/forum";
import React from "react";
import ForumItemsList from "../forumItem/ForumItemsList";
import { styled } from "@mui/material/styles";


const ForumContainer = styled(Box)(({ theme }) => ({
	marginBottom: theme.spacing(3),
}));

const ForumCategory: React.FC<{ category: ForumCategoryModel }> = ({ category }) => {
	return (
		<ForumContainer>
			<ForumCategoryHeader title={category.name} />
			<ForumItemsList forums={category.forums} />
		</ForumContainer>
	)
}

export default ForumCategory;
