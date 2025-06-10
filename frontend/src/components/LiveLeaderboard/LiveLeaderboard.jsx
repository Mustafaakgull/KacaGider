import React from 'react';
import { Box, Typography, Chip, Divider } from '@mui/material';

function LiveLeaderBoard({ leaderboard }) {
    const dummyLeaderboard = [
        { username: "admin", score: 0 },


    ];

    const safeLeaderboard =
        Array.isArray(leaderboard) && leaderboard.length > 0
            ? leaderboard
            : dummyLeaderboard;

    const sorted = [...safeLeaderboard].sort((a, b) => b.score - a.score);

    return (
        <Box
            sx={{
                width: "100%",
                maxWidth: 550,
                minWidth: 300,
                height: '100%',
                maxHeight: '950px', // dış container ile uyumlu olacaksa bu değeri dışarıdan al
                backgroundColor: "#1e1e1e",
                borderRadius: 2,
                padding: 2,
                color: "#fff",
                fontFamily: "Roboto, sans-serif",
                boxShadow: 3,
                overflowY: "auto", // scroll aktif
                position: "relative"
            }}
        >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="subtitle1" fontWeight="bold">
                    🧑‍💻 Online Users
                </Typography>
                <Chip
                    label={sorted.length}
                    size="small"
                    sx={{
                        backgroundColor: "#ff9800",
                        color: "#000",
                        fontWeight: "bold"
                    }}
                />
            </Box>

            <Divider sx={{ borderColor: "#444", mb: 1 }} />

            <Box>
                {sorted.map((user) => (
                    <Box
                        key={user.username}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        px={1}
                        py={0.75}
                        sx={{
                            backgroundColor: "#2a2a2a",
                            borderRadius: 1,
                            mb: 1,
                        }}
                    >
                        <Typography fontWeight="bold" color="#f5f5f5">
                            {user.username}
                        </Typography>
                        <Chip
                            label={`${user.score} puan`}
                            size="small"
                            sx={{
                                backgroundColor: "#fbaf32",
                                color: "#000",
                                fontWeight: "bold"
                            }}
                        />
                    </Box>
                ))}
            </Box>
        </Box>
    );
}

export default LiveLeaderBoard;
