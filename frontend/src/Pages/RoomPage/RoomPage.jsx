import React, { useContext, useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import ProductCard from "../../components/ProductTable/ProductTable.jsx";
import TopThreeLeaderboard from "../../components/TopThreeBoard/TopThreeBoard.jsx";
import { SocketContext } from '../../SocketioConnection.jsx';
import LeaderBoard from "../../components/LiveLeaderboard/LiveLeaderboard.jsx";
import Chatbox from "../../components/Chatbox/Chatbox.jsx";
import axios from "axios";

function RoomPage() {
    const socket = useContext(SocketContext);
    const [guessCount, setGuessCount] = useState(0);
    const [listing, setListing] = useState(null);
    const [leaderboard, setLeaderboard] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [topThree, setTopThree] = useState([]);
    const [realPrice, setRealPrice] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:5000/whoami", { withCredentials: true })
            .then(res => {
                if (res.data.username) {
                    setIsAuthenticated(true);
                }
            })
            .catch(() => setIsAuthenticated(true));
    }, []);

    useEffect(() => {
        socket.emit("take_vehicle_data", "otomobil");
        socket.emit("take_leaderboard_data");

        socket.on("leaderboard_data", data => {
            if (Array.isArray(data)) {
                setLeaderboard(data);
            } else if (Array.isArray(data.leaderboard)) {
                setLeaderboard(data.leaderboard);
            } else {
                setLeaderboard([]);
            }
        });

        socket.on("vehicle_data:", (data) => {
            console.log("Yeni ilan geldi:", data);
            setListing(null);
            setTimeout(() => {
                setListing(data);
            }, 10);
        });

        const startRound = () => {
            console.log("⏱️ Yeni tur başladı");
            // 20 saniye sonra round sona ersin
            setTimeout(() => {
                // Mock sonuçlar
                setRealPrice(384000);
                setTopThree([
                    { username: "yurt68", guess: 380000, percentage: 99.0, score: 1093 },
                    { username: "Kaanehxheh", guess: 380000, percentage: 99.0, score: 1067 },
                    { username: "ygmrrr", guess: 385000, percentage: 99.7, score: 1066 }
                ]);
                setShowResults(true);

                // 5 saniye sonuç gösterilsin
                setTimeout(() => {
                    setShowResults(false);
                    setGuessCount(0);
                    socket.emit("take_vehicle_data", "otomobil");

                    // 🔁 SONSUZ DÖNGÜ — yeni turu tekrar başlat
                    startRound();
                }, 5000);
            }, 20000);
        };

        // İlk turu başlat
        startRound();

        return () => {
            socket.off("vehicle_data:");
            socket.off("leaderboard_data");
        };
    }, [socket]);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "center",
                minHeight: "100vh",
                backgroundColor: "#111",
                color: "#fff",
                padding: 3,
                gap: 4,
                overflowY: "auto",
            }}
        >
            {listing && (
                <Grid container spacing={2} sx={{ mt: 2, maxWidth: "1200px" }}>
                    <Grid item xs={12} md={7}>
                        {showResults ? (
                            <TopThreeLeaderboard
                                realPrice={realPrice}
                                topThree={topThree}
                                secondsLeft={5}
                            />
                        ) : (
                            <ProductCard
                                listing={listing}
                                guessCount={guessCount}
                                setGuessCount={setGuessCount}
                                isAuthenticated={isAuthenticated}
                            />
                        )}
                    </Grid>

                    <Grid item xs={12} md={5}>
                        <Box sx={{ ml: 6 }}>
                            <LeaderBoard leaderboard={leaderboard} />
                        </Box>
                    </Grid>
                </Grid>
            )}
            <Chatbox />
        </Box>
    );
}

export default RoomPage;
