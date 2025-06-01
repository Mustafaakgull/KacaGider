import React from 'react';
import { Typography, Box, LinearProgress } from '@mui/material';

function CountdownTimer({ seconds }) {
    const percent = (seconds / 10) * 100;

    return (
        <Box sx={{ m: 2 }}>
            <Typography variant="body1">⏱️ Time left: {seconds}s</Typography>
            <LinearProgress variant="determinate" value={percent} />
        </Box>
    );
}

export default CountdownTimer;
