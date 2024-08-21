export interface ForumItemModel {
	id: number;
	name: string;
	createdAt: number;
	updatedAt: number;
	threadStatistic?: number;
	messageStatistic?: number;
	forumCategory: { id: number, name: string };
	latestThread?: {
		title: string;
		time: string;
		author: string;
	};
}

export interface ForumCategoryModel {
	id: number;
	name: string;
	forums: ForumItemModel[];
}
