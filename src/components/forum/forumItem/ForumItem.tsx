import {styled} from "@mui/material/styles";
import {Box, Grid, Typography} from "@mui/material";
import ForumItemTitle from "./ForumItemTitle";
import ForumItemStatistic from "./ForumItemStatistic";
import ForumLatestThread from "./ForumLatestThread";
import {ForumItemModel} from "../../types/forum";
import React from "react";



interface ForumItemProps {
    forum: ForumItemModel;
    isLastItem: boolean;
}

const GridItemStyled = styled(Grid)(({theme}) => ({
    alignContent: 'center',
    [theme.breakpoints.down('tablet')]: {
        alignContent: 'left',
    }
}));

const TitleInMobileStyled = styled(Typography)(({theme}) => ({
    fontSize: '1rem',
    // color: theme.palette.text.primary,
    // marginLeft: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    // display: 'none',
    // [theme.breakpoints.down('tablet')]: {
    //     display: 'block',
    // }
}));

const ForumItem: React.FC<ForumItemProps> = ({forum, isLastItem}) => {
    return (
        // <Box sx={{ pl: 2, pt: 1, pb: 1, pr: 0, borderBottom: isLastItem ? 0 : 1, borderColor: 'divider'}}>
        //     <Grid container spacing={2}>
        //         <GridItemStyled item mobile={3} laptop={6}>
        //         <ForumItemTitle title={forum.title}/>
        //         </GridItemStyled>
        //         <GridItemStyled item laptop={1} mobile={4.5}>
        //             <ForumItemStatistic title={'Threads'} number={forum.threadStatistic}/>
        //         </GridItemStyled>
        //         <GridItemStyled item laptop={1} mobile={4.5}>
        //             <ForumItemStatistic title={'Messages'} number={forum.messageStatistic}/>
        //         </GridItemStyled>
        //         <GridItemStyled item laptop={4} mobile={9}>
        //             <ForumLatestThread title={forum.latestThread.title} time={forum.latestThread.time} author={forum.latestThread.author}/>
        //         </GridItemStyled>
        //     </Grid>
        // </Box>

    <Box sx={{ pl: 2, pt: 1, pb: 1, pr: 0, borderBottom: isLastItem ? 0 : 1, borderColor: "divider" }}>
        <Grid container spacing={2}>
            <GridItemStyled item mobile={1} tablet={1} laptop={5}>
                <ForumItemTitle title={forum.title} />
            </GridItemStyled>

            <GridItemStyled item mobile={11} tablet={11} laptop={7}>
                <Grid container>
                    {/* Statistic components */}
                    <GridItemStyled item mobile={12} tablet={6} sx={{
                        display: {
                            mobile: 'block',
                            tablet: 'block',
                            laptop: 'none',
                        },
                    }}>
                        <Grid container>
                            <GridItemStyled item mobile={12}>
                                <TitleInMobileStyled variant={'subtitle1'} sx={{ color: 'primary.main'}}>{forum.title}</TitleInMobileStyled>
                            </GridItemStyled>
                            <GridItemStyled item mobile={4} >
                                <ForumItemStatistic title={"Threads"} number={forum.threadStatistic} />
                            </GridItemStyled>
                            <GridItemStyled item mobile={4}>
                                <ForumItemStatistic title={"Messages"} number={forum.messageStatistic} />
                            </GridItemStyled>
                        </Grid>
                    </GridItemStyled>
                    <GridItemStyled item mobile={6} laptop={2} sx={{
                        display: {
                            mobile: 'none',
                            tablet: 'none',
                            laptop: 'block',
                        },
                    }}>
                        <ForumItemStatistic title={"Threads"} number={forum.threadStatistic} />
                    </GridItemStyled>
                    <GridItemStyled item mobile={6} laptop={2} sx={{
                        display: {
                            mobile: 'none',
                            tablet: 'none',
                            laptop: 'block',
                        },
                    }}>
                        <ForumItemStatistic title={"Messages"} number={forum.messageStatistic} />
                    </GridItemStyled>
                    {/* Latest thread component */}
                    <GridItemStyled item mobile={12} tablet={6} laptop={8}>
                        <ForumLatestThread
                            title={forum.latestThread.title}
                            time={forum.latestThread.time}
                            author={forum.latestThread.author}
                        />
                    </GridItemStyled>
                </Grid>
            </GridItemStyled>
        </Grid>
    </Box>
    )
}

export default ForumItem;