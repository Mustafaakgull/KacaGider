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
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [showResults, setShowResults] = useState(false);
    const [top3Received, setTop3Received] = useState(false);
    const [leaderboardReceived, setLeaderboardReceived] = useState(false);

    const path = window.location.pathname;
    const roomName = path.split("/")[2];

    // Kullanıcı oturum kontrolü
    useEffect(() => {
    socket.emit("take_leaderboard_data", roomName);
    socket.emit("take_top3_leaderboard_data", roomName);
    socket.emit("take_vehicle_data", roomName);

    socket.on("vehicle_data:", (data) => {
        console.log("Yeni ilan geldi:", data);
        setRealPrice(data.data["fiyat"]);
        setListing(null);
        setTimeout(() => {
            setListing(data);
        }, 10);
    });

    socket.on("leaderboard_data", (data) => {
        setLeaderboard(data);
        setLeaderboardReceived(true);
    });

    socket.on("leaderboard_data_top3", (data) => {
        setTopThree(data);
        setTop3Received(true);
    });

    return () => {
        socket.off("vehicle_data:");
        socket.off("leaderboard_data");
        socket.off("leaderboard_data_top3");
    };
}, [socket]);

// Yeni round başlat
const startNextRound = () => {
    console.log("🔁 Yeni tur başlıyor...");
    setTop3Received(false);
    setLeaderboardReceived(false);
    setGuessCount(0);
    socket.emit("take_leaderboard_data", roomName);
    socket.emit("take_top3_leaderboard_data", roomName);
};

// Tüm veriler geldiyse sonuçları göster
useEffect(() => {
    if (top3Received && leaderboardReceived) {
        setShowResults(true);
    }
}, [top3Received, leaderboardReceived]);

// Sonuçlar gösterildikten 5 saniye sonra yeni aracı al
useEffect(() => {
    if (showResults) {
        const timer = setTimeout(() => {
            setShowResults(false); // Sonuç ekranını kapat
            socket.emit("game_finished");
            socket.emit("take_vehicle_data", roomName); // Yeni ilan al
        }, 5000); // 5 saniye sonuç göster

        return () => clearTimeout(timer);
    }
}, [showResults]);

// Yeni ilan geldiğinde -> yeni round başlat
useEffect(() => {
    if (listing && !showResults) {
        // Yalnızca normal ekranda ve ilan varsa
        const delay = setTimeout(() => {
            startNextRound();
        }, 20000); // kullanıcı tahmin yapmak için 20 saniye alır

        return () => clearTimeout(delay);
    }
}, [listing, showResults]);



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
