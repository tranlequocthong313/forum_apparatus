import React from "react";
import {Box, Typography} from "@mui/material";

const NotFound: React.FC = () => {
    return (
        <Box textAlign="center" mt={5}>
            <Typography variant="h1">404</Typography>
            <Typography variant="h5">Page Not Found</Typography>
        </Box>
    );
};
export default NotFound;
