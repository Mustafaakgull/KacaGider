import React from 'react';
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";

function Leaderboard({ leaderboard }) {
    return (
        <Box
            sx={{
                width: 300,
                backgroundColor: "#222",
                borderRadius: 2,
                padding: 2,
                boxShadow: 3,
            }}
        >
            <Typography variant="h6" gutterBottom>
                Leaderboard
            </Typography>
            <List dense>
                {leaderboard.map((user, index) => (
                    <ListItem key={user.username}>
                        <ListItemText
                            primary={`${index + 1}. ${user.username}`}
                            secondary={`Score: ${user.score}`}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}

export default Leaderboard;
