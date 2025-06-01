import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';

function LiveLeaderboard({ leaderboard }) {
    return (
        <Card sx={{ m: 2 }}>
            <CardContent>
                <Typography variant="h6">🏆 Live Leaderboard</Typography>
                <List>
                    {leaderboard.map((user, index) => (
                        <ListItem key={index}>
                            <ListItemText
                                primary={`${index + 1}. ${user.username}`}
                                secondary={`Score: ${user.score}`}
                            />
                        </ListItem>
                    ))}
                </List>
            </CardContent>
        </Card>
    );
}

export default LiveLeaderboard;
