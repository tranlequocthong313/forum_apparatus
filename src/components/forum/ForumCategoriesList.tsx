import { Box } from "@mui/material";
import ForumCategory from "./forumCategory/ForumCategory";
import { ForumCategoryModel, ForumItemModel } from "../types/forum";
import { useEffect, useState } from "react";
import APIs, { threadCategoryApis, authAPIs } from "../../configs/api";

const ForumCategoriesList = () => {
	const [categories, setCategories] = useState<ForumCategoryModel[]>([])

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const res = await APIs.get<ForumItemModel[]>(threadCategoryApis.all)
				const groupedData = res.data.reduce((acc, forum) => {
					const category = forum.forumCategory;
					const existingCategory = acc.find(cat => cat.id === category.id);

					if (existingCategory) {
						existingCategory.forums.push(forum);
					} else {
						acc.push({
							id: category.id,
							name: category.name,
							forums: [forum],
						});
					}

					return acc;
				}, [] as ForumCategoryModel[]);

				setCategories(groupedData);
			} catch (error) {
				console.error(error)
			}
		}

		fetchCategories()
	}, [])

	return (
		<Box sx={{ bgcolor: 'background.default', p: 2 }}>
			{categories.map((category) => (
				<ForumCategory key={category.id} category={category} />
			))}
		</Box>
	)
}

export default ForumCategoriesList;
