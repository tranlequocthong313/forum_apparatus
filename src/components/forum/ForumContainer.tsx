import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";


const ForumContainer = styled(Box)(({theme}) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    padding: theme.spacing(2),
}))

export default ForumContainer;