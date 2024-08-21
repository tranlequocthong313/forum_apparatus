import {Avatar, Box, Button, Container, Divider, Grid, Paper, Typography} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import React from "react";
import {styled} from "@mui/material/styles";
import CKEditorWrapper from "../components/ckeditor/CKEditorWrapper";
import LoadingButton from "@mui/lab/LoadingButton";
import ReplyIcon from '@mui/icons-material/Reply';

interface ThreadMetaProps {
    threadTitle: string;
    createdBy: string;
    postDate: string;
}

const ThreadMetadata: React.FC<any> = ({createdBy, postDate}) => {
    return (
        <Box sx={{display: 'flex', alignItems: 'center', gap: 2, color: 'text.secondary'}}>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
                <PersonIcon fontSize="small" sx={{mr: 0.5}}/>
                <Typography variant="body2">
                    {createdBy}
                </Typography>

            </Box>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
                <AccessTimeIcon fontSize="small" sx={{mr: 0.5}}/>
                <Typography variant="body2">{postDate}</Typography>
            </Box>

        </Box>
    )
}


interface CommentProps {
    username: string;
    role: string;
    avatarUrl: string;
    commentTime: string;
    content: string;
}


const ReplyBox: React.FC<any> = ({username, avatarUrl}) => {
    const handleEditorChange = (event: any, editor: any) => {

    }
    return (
        <>
        <Paper elevation={3} sx={{
            display: 'flex',
            gap: 2,
            marginBottom: 2,
        }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: "background.default",
                    p: 2,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flex: 1.5
                }}
            >
                <Avatar src={avatarUrl} alt={username} sx={{
                    width: 64, height: 64
                }}/>
                <Typography variant="body1" sx={{
                    color: 'primary.main',
                    fontWeight: 500,
                    lineHeight: 2,
                    letterSpacing: '0.5px',
                    textAlign: 'center',
                    wordBreak: 'break-word',
                    hyphens: 'auto',
                    overflowWrap: 'break-word',
                }} component="span">
                    {username}
                </Typography>
            </Box>

            <Box
                sx={{flex: '10.5', py: 2, pr: 2, minWidth: 0, position: 'relative', display: 'flex', flexDirection: 'column', gap: 2, justifyContent: 'flex-end'}}
            >
                <Divider sx={{
                    visibility: 'hidden',
                    marginY: 1,
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        border: '10px solid transparent',
                        borderRightColor: 'background.paper',
                        transform: 'translate(calc(-16px - 100%), -50%)',
                        width: 0,
                        height: 0,
                        display: 'block',
                        visibility: 'visible',
                    }

                }}

                />
                <CKEditorWrapper
                    editorProps={{
                        '& .ck-editor__main > .ck-editor__editable': {
                            minHeight: '150px',
                            overflow: 'hidden'
                        },
                    }}
                    containerProps={{
                        display: 'block',
                        width: '100%'
                    }}

                    data={""}
                    onChange={handleEditorChange}
                    onReady={(editor: any) => {
                    }}
                />


                <LoadingButton
                    color="primary"
                    variant="contained"
                    // type={'submit'}
                    size='small'
                    sx={{ml: 'auto', flex: 1, left: 0}}
                    startIcon={<ReplyIcon />}
                >
                    <Typography variant={'button'}>
                        Post reply
                    </Typography>
                </LoadingButton >
            </Box>



        </Paper>

        </>
    )
}

const Comment: React.FC<CommentProps> = ({username, role, avatarUrl, commentTime, content}) => {
    return (
        <Paper elevation={3} sx={{
            display: 'flex',
            gap: 2,
            marginBottom: 2,
        }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: "background.default",
                    p: 2,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flex: 1.5
                }}
            >
                <Avatar src={avatarUrl} alt={username} sx={{
                    width: 64, height: 64
                }}/>
                <Typography variant="body1" sx={{
                    color: 'primary.main',
                    fontWeight: 500,
                    lineHeight: 2,
                    letterSpacing: '0.5px',
                    textAlign: 'center',
                    wordBreak: 'break-word',
                    hyphens: 'auto',
                    overflowWrap: 'break-word',
                }} component="span">
                    {username}
                </Typography>
            </Box>

            <Box
                sx={{flex: 10.5, py: 2, pr: 2, position: 'relative',}}
            >
                <Box sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: 1}}>
                    <Typography variant="body2" color="textSecondary">
                        {commentTime}
                    </Typography>
                </Box>
                <Divider sx={{
                    marginY: 1,
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        border: '10px solid transparent',
                        borderRightColor: 'background.paper',
                        transform: 'translate(calc(-16px - 100%), -50%)',
                        width: 0,
                        height: 0,
                        display: 'block'
                    }

                }}

                />
                <Typography variant="body1">
                    {content}
                </Typography>
            </Box>

        </Paper>
    )
}


const ThreadHeader: React.FC<ThreadMetaProps> = ({createdBy, postDate, threadTitle}) => {
    return (
        <Container
            sx={{
                pb: 2
            }}
        >
            <Typography
                variant={'h5'}
                color={'primary.main'}
                gutterBottom
                sx={{
                    mb: 2,
                    fontWeight: 500,
                    lineHeight: 1.5,
                    letterSpacing: '0.5px'
                }}
            >
                {threadTitle}
            </Typography>
            <ThreadMetadata createdBy={createdBy} postDate={postDate}/>
        </Container>
    )
}


function ThreadDetails() {
    return (
        <>
            <ThreadHeader
                threadTitle='[HN] Tư vấn nâng cấp PC, ngân sách 15 triệu, code, render và stable diffusion (ưu tiên intel)'
                postDate='Yesterday at 5:13 PM'
                createdBy='songokukx'

            />
            <Comment
                username="songokukx"
                role="Junior Member"
                avatarUrl="https://example.com/avatar.png"
                commentTime="Yesterday at 5:13 PM"
                content={`Mình hiện có nhu cầu nâng cấp PC hiện có lên đời chip mới, mục đích là code nhẹ nhàng, render và sử dụng các model stable diffusion
        Cấu hình case hiện tại như sau:
        - Main MSI Z170 tomahawk
        - Cpu intel core i7 6700
        - Tản cooler master T400i
        - Ram 24gb 2667
        - Nguồn XIGMATEK CERBERUS S550 550w
        - Case aigo skyred + fan led
        
        Kinh phí tầm 15 triệu, anh em tư vấn giúp nên nâng những phần nào với.
        Bác nào hỗ trợ vừa nâng cấp vừa trade lại đồ cũ thì tốt
        Em cảm ơn các bác`}
            />
            <Comment
                username="songokukx"
                role="Junior Member"
                avatarUrl="https://example.com/avatar.png"
                commentTime="Yesterday at 5:13 PM"
                content={`Mình hiện có nhu cầu nâng cấp PC hiện có lên đời chip mới, mục đích là code nhẹ nhàng, render và sử dụng các model stable diffusion
        Cấu hình case hiện tại như sau:
        - Main MSI Z170 tomahawk
        - Cpu intel core i7 6700
        - Tản cooler master T400i
        - Ram 24gb 2667
        - Nguồn XIGMATEK CERBERUS S550 550w
        - Case aigo skyred + fan led
        
        Kinh phí tầm 15 triệu, anh em tư vấn giúp nên nâng những phần nào với.
        Bác nào hỗ trợ vừa nâng cấp vừa trade lại đồ cũ thì tốt
        Em cảm ơn các bác`}
            />


            <ReplyBox/>

    {/*// <Container>*/}
    {/*//     <Typography variant={'h5'} color={'text.secondary'} gutterBottom sx={{ mb: 2, fontWeight: 'bold'}}>*/}
    {/*//         [HN] Tư vấn nâng cấp PC, ngân sách 15 triệu, code, render và stable diffusion (ưu tiên intel)*/}
    {/*//     </Typography>*/}
    {/*//     <Box*/}
    {/*//         sx={{ display: 'flex', alignItems: 'center', mb: 2}}*/}
    {/*//*/}
    {/*//     >*/}
    {/*//*/}
    {/*//     </Box>*/}
    {/*//     <Paper elevation={3}>*/}
    {/*//*/}
    {/*//     </Paper>*/}
    {/*// </Container>*/}
            </>

)
    ;
}

export default ThreadDetails;
