import React from 'react';
import { Grid, Card, CardContent, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import ForumCategoriesList from "./forum/ForumCategoriesList";

function MainContent() {
    return (
        <Grid container spacing={2}>
            <Grid item mobile={12} laptop={10}>
                <ForumCategoriesList />

                <Card sx={{ mb: 3 }}>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            Featured Post
                        </Typography>
                        <Typography variant="body2">
                            This is a featured post with some content...
                        </Typography>
                    </CardContent>
                </Card>
                <List>
                    {[1, 2, 3, 4, 5].map((item) => (
                        <React.Fragment key={item}>
                            <ListItem alignItems="flex-start">
                                <ListItemText
                                    primary={`Recent Post ${item}`}
                                    secondary="This is a short description of the post..."
                                />
                            </ListItem>
                            <Divider component="li" />
                        </React.Fragment>
                    ))}
                </List>
            </Grid>
            <Grid item mobile={0} laptop={2}>
                <Card sx={{ mb: 3 }}>
                    <CardContent>
                        <Typography variant="h6">Login/Register</Typography>
                        {/* Add login form or buttons here */}
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Hot Topics</Typography>
                        <List>
                            {[1, 2, 3].map((item) => (
                                <ListItem key={item}>
                                    <ListItemText primary={`Hot Topic ${item}`} />
                                </ListItem>
                            ))}
                        </List>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}

export default MainContent;