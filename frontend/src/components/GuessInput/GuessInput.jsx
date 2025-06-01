import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

function GuessInput({ socket }) {
    const [guess, setGuess] = useState("");
    const [feedback, setFeedback] = useState("");
    const [guessCount, setGuessCount] = useState(0);

    const handleGuess = () => {
        if (!guess || guessCount >= 3) return;

        socket.emit('make_guess', parseFloat(guess));

        socket.once('guess_feedback', (data) => {
            setFeedback(data.message); // higher/lower
        });

        setGuessCount(prev => prev + 1);
        setGuess('');
    };

    return (
        <Box sx={{ m: 2 }}>
            <TextField
                label="Enter your guess"
                type="number"
                value={guess}
                onChange={e => setGuess(e.target.value)}
                fullWidth
            />
            <Button variant="contained" fullWidth sx={{ mt: 1 }} onClick={handleGuess} disabled={guessCount >= 3}>
                Submit Guess
            </Button>
            {feedback && <Typography sx={{ mt: 1 }}>{feedback}</Typography>}
        </Box>
    );
}

export default GuessInput;
