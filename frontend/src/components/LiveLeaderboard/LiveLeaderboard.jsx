import React from 'react';
import { Box, Typography, Chip, Divider } from '@mui/material';

function LiveLeaderBoard({ leaderboard }) {
    const dummyLeaderboard = [
        { username: "miracalp", score: 61697 },
        { username: "keb1b", score: 32352 },
        { username: "creamdassak", score: 31624 },
        { username: "Andy41", score: 38192 },
        { username: "OmerTR", score: 27005 },
        { username: "emiw", score: 15327 },
        { username: "Altug00276272", score: 13324 },
        { username: "huseyin321", score: 5882 },
        { username: "emre0841", score: 18326 },
        { username: "volkan", score: 13200 },
        { username: "kerem", score: 11300 },
        { username: "ozan", score: 10800 },
        { username: "ozan1", score: 10800 },
        { username: "oza2n", score: 10800 },
        { username: "oza3n", score: 10800 },
        { username: "oz4an", score: 10800 },
        { username: "oz4a3n", score: 10800 },
        { username: "oz4a1n", score: 10800 },
        { username: "oz42an", score: 10800 },
        { username: "oz43adn", score: 10800 },
        { username: "oz4gan", score: 10800 },

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
