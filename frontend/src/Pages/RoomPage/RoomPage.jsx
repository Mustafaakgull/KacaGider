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
    const [topThree, setTopThree] = useState([]);
    const [realPrice, setRealPrice] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [top3Received, setTop3Received] = useState(false);
    const [leaderboardReceived, setLeaderboardReceived] = useState(false);
    const [roundStarted, setRoundStarted] = useState(false);

    const path = window.location.pathname;
    const roomName = path.split("/")[2];

    // Kullanıcı oturum kontrolü
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
        socket.emit("take_vehicle_data", roomName);
        socket.emit("take_leaderboard_data", roomName);
        socket.emit("take_top3_leaderboard_data", roomName);

        socket.on("vehicle_data:", (data) => {
            console.log("Yeni ilan geldi:", data);
            setRealPrice(data.data["fiyat"]);
            setListing(null);
            setTimeout(() => {
                setListing(data);
            }, 10);
        });

        socket.on("leaderboard_data", (data) => {
            console.log("leaderboard data", data);
            setLeaderboard(data);
            setLeaderboardReceived(true);
        });

        socket.on("leaderboard_data_top3", (data) => {
            console.log("top3 leaderboard data", data);
            setTopThree(data);
            setTop3Received(true);
        });

        const startRound = () => {
            console.log("🔁 Yeni tur başladı");

            setTimeout(() => {
                setTop3Received(false);
                setLeaderboardReceived(false);

                socket.emit("take_leaderboard_data", roomName);
                socket.emit("take_top3_leaderboard_data", roomName);
                setRoundStarted(true); // bu turu bekle
            }, 20000);

            setTimeout(() => {
                setShowResults(false);
                setGuessCount(0);
                socket.emit("game_finished");
                socket.emit("take_vehicle_data", roomName);
                startRound(); // yeni tura geç
            }, 25000); // sonuç ekranı 5 saniye gösterilecek
        };

        startRound();

        return () => {
            socket.off("vehicle_data:");
            socket.off("leaderboard_data");
            socket.off("leaderboard_data_top3");
        };
    }, [socket]);

    // Sadece veriler geldikten sonra sonuçları göster
    useEffect(() => {
        if (roundStarted && top3Received && leaderboardReceived) {
            setShowResults(true);
            setRoundStarted(false); // reset
        }
    }, [top3Received, leaderboardReceived, roundStarted]);

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
