import {Box, ListItemText, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";


const ForumItemTitle = styled(ListItemText)(({ theme }) => ({
    '& .MuiListItemText-primary': {
        fontWeight: 'bold',
    },
    '& .MuiListItemText-secondary': {
        color: theme.palette.text.secondary
    }
}));


const HeaderContainer = styled(Box)(({theme}) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    padding: theme.spacing(2),
}))

const Dashboard = (title: String) => (
    <HeaderContainer>
        <Typography variant={'h5'}>{title}</Typography>
    </HeaderContainer>
)

export default Dashboard;
