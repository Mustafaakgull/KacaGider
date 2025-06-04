import React, { useContext, useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import ProductCard from "../../components/ProductTable/ProductTable.jsx";
import TopThreeLeaderboard from "../../components/TopThreeBoard/TopThreeBoard.jsx";
import { SocketContext } from '../../SocketioConnection.jsx';
import LeaderBoard from "../../components/LiveLeaderboard/LiveLeaderboard.jsx";
import Chatbox from "../../components/Chatbox/Chatbox.jsx";
import CountdownTimer from "../../components/Timer/Timer.jsx";
import {GameController} from "phosphor-react";
// import axios from "axios";

function RoomPage() {
    const socket = useContext(SocketContext);
    const [vehicleData, setVehicleData] = useState(null);
    const [leaderboard, setLeaderboard] = useState([]);
    const [topThree, setTopThree] = useState([]);
    const [realPrice, setRealPrice] = useState(null);
    // for if user not logged in, cannot guess
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    const [showResults, setShowResults] = useState(false);
    const [top3Received, setTop3Received] = useState(false);
    const [leaderboardReceived, setLeaderboardReceived] = useState(false);
    const [roundDeadline, setRoundDeadline] = useState(Date.now() + 20000);
    const path = window.location.pathname;
    const roomName = path.split("/")[2];

    // initial start take the car info
    useEffect(() => {
        socket.emit("take_vehicle_data", roomName);
        socket.emit("take_leaderboard_data", roomName)
  }, []);


        useEffect(() => {

    socket.on("vehicle_data:", (data) => {
        console.log("Yeni ilan geldi:", data);
        setRealPrice(data.data["fiyat"]);
        setVehicleData(data);
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
}, [roomName, socket]);

// Yeni round başlat
const startNextRound = () => {
    console.log("🔁 Tur bitti, top3 açıldı...");
    setTop3Received(false);
    setLeaderboardReceived(false);
    socket.emit("game_finished");
    socket.emit("take_leaderboard_data", roomName);
    socket.emit("take_top3_leaderboard_data", roomName);
    setRoundDeadline(Date.now() + 25000);

};

useEffect(() => {
    if (top3Received && leaderboardReceived) {
        setShowResults(true);
    }
}, [top3Received, leaderboardReceived]);

// SADECE SONUÇ GÖSTERME
useEffect(() => {
    if (showResults) {
        const timer = setTimeout(() => {
            setShowResults(false); // Sonuç ekranını kapat
            socket.emit("take_vehicle_data", roomName);
            socket.emit("take_leaderboard_data", roomName);
            socket.emit("take_top3_leaderboard_data", roomName);

        }, 5000);


        return () => clearTimeout(timer);
    }
}, [roomName, showResults, socket]);

// Yeni ilan geldiğinde -> yeni round başlat
useEffect(() => {

    // Yalnızca normal ekranda ve ilan varsa
    if (vehicleData && !showResults) {
        const delay = setTimeout(() => {
            startNextRound();
        }, 20000); // kullanıcı tahmin yapmak için 20 saniye alır

        return () => clearTimeout(delay);
    }
}, [vehicleData, showResults, startNextRound]);



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
                            {!showResults && <CountdownTimer deadline={roundDeadline} />}

            {vehicleData && (
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
                                vehicle_data={vehicleData}
                                isAuthenticated={isAuthenticated}
                                showResults={showResults}

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
