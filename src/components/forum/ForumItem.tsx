import {styled} from "@mui/material/styles";
import {ListItem} from "@mui/material";

const ForumItem = styled(ListItem)(({ theme }) => ({
    padding: theme.spacing(2),
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
}));

export default ForumItem;