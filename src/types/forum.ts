export interface ForumItemModel {
    id: number;
    title: string;
    threadStatistic: number;
    messageStatistic: number;
    latestThread: {
        title: string;
        time: string;
        author: string;
    };
}

export interface ForumCategoryModel {
    id: number;
    title: string;
    forums: ForumItemModel[];
}