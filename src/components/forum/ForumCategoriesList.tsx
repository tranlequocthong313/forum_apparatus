import {Box} from "@mui/material";
import ForumCategory from "./forumCategory/ForumCategory";
import {ForumCategoryModel} from "../../types/forum";

const categories: ForumCategoryModel[] = [
    {
        id: 1,
        title: 'Đại sảnh',
        forums: [
            {
                id: 1, title: 'Thông báo', threadStatistic: 18, messageStatistic: 45, latestThread: {
                    title: 'Công bố thẻ đồng thương hiệu Timo × VOZ và các ưu đãi liên quan',
                    time: 'Jan 21, 2022',
                    author: 'fRzzy'
                }
            },
            {
                id: 2, title: 'Góp ý', threadStatistic: 3100, messageStatistic: 59500, latestThread: {
                    title: 'AMD ra mắt thế hệ CPU Zen 5',
                    time: 'Start date Jun 3, 2024',
                    author: 'Thread starter Morgan le Fay'
                }
            },
            {
                id: 3, title: 'Góp ý', threadStatistic: 3100, messageStatistic: 59500, latestThread: {
                    title: 'AMD ra mắt thế hệ CPU Zen 5',
                    time: 'Start date Jun 3, 2024',
                    author: 'Thread starter Morgan le Fay'
                }
            },

        ]
    },
    {
        id: 2,
        title: 'Máy tính',
        forums: [
            {
                id: 4,
                title: 'Tư vấn cấu hình',
                threadStatistic: 4700,
                messageStatistic: 50400,
                latestThread: {
                    title: 'Có nên thay i5 9400f bằng xeon E5 2680v4 để gánh RX 6600xt?',
                    time: 'Tuesday at 10:53 PM',
                    author: 'durzars'
                }
            },
            {
                id: 5,
                title: 'Overclocking & Cooling & Modding',
                threadStatistic: 1800,
                messageStatistic: 48000,
                latestThread: {
                    title: 'Tư Vấn Case TUF GT502 và Fractal North',
                    time: 'Tuesday at 10:13 PM',
                    author: 'vincente48'
                }
            },
        ]
    },
];

const ForumCategoriesList = () => {
    return (
        <Box sx={{ bgcolor: 'background.default', p: 2 }}>
            {categories.map((category) => (
                <ForumCategory key={category.id} category={category} />
            ))}
        </Box>
    )
}

export default ForumCategoriesList;