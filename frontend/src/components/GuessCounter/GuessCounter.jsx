import React from "react";
import { Typography, Box } from "@mui/material";

function GuessCounter({ count }) {
    return (
        <Box sx={{ mt: 2 }}>
            <Typography variant="body1" align="center" color="gray">
                {count} / 3
            </Typography>
        </Box>
    );
}

export default GuessCounter;
