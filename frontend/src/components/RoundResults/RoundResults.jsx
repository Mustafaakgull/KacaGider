import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';

function RoundResults({ result }) {
    const { actualPrice, topGuesses } = result;

    return (
        <Card sx={{ m: 2 }}>
            <CardContent>
                <Typography variant="h6">🚘 Actual Price: {actualPrice}₺</Typography>
                <Typography variant="subtitle1">Top 3 Closest Guesses</Typography>
                <List>
                    {topGuesses.map((g, index) => (
                        <ListItem key={index}>
                            <ListItemText
                                primary={`${index + 1}. ${g.username}`}
                                secondary={`Guess: ${g.guess}₺ | Accuracy: ${g.percentage}% | Points: ${g.points}`}
                            />
                        </ListItem>
                    ))}
                </List>
            </CardContent>
        </Card>
    );
}

export default RoundResults;
