import React, { useContext, useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import ProductCard from "../../components/ProductTable/ProductTable.jsx";
import TopThreeLeaderboard from "../../components/TopThreeBoard/TopThreeBoard.jsx";
import { SocketContext } from '../../SocketioConnection.jsx';
import LeaderBoard from "../../components/LiveLeaderboard/LiveLeaderboard.jsx";
import Chatbox from "../../components/Chatbox/Chatbox.jsx";
import CountdownTimer from "../../components/Timer/Timer.jsx";
import {GameController} from "phosphor-react";
import axios from "axios";
// import axios from "axios";

function RoomPage() {
    const socket = useContext(SocketContext);
    const [vehicleData, setVehicleData] = useState(null);
    const [leaderboard, setLeaderboard] = useState([]);
    const [topThree, setTopThree] = useState([]);
    const [realPrice, setRealPrice] = useState(null);
    const [timer, setTimer] = useState(20)
    // for if user not logged in, cannot guess
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    const [showResults, setShowResults] = useState(false);
    const [roundDeadline, setRoundDeadline] = useState(Date.now() + 20000);
    const path = window.location.pathname;
    const roomName = path.split("/")[2];
    const [cookie, setCookie] = useState(null)
    const [disabled, setDisabled] = useState(false);

        useEffect(() => {
        if (disabled) return;  // stop running if disabled

        try {
            axios.post('https://api.kacagider.net/whoami', {}, { withCredentials: true }
            ).then(response => {
               console.log("response", response)
                if (response.data.username !== null){
                    setCookie(response.data.session_id)
                    setDisabled(true);

                }
            });

        } catch (e) {
            console.error(e);
        }
  },);
  //   initial start take the car info
    useEffect(() => {
        socket.emit("timer")
  }, []);

        useEffect(() => {

    const interval = setInterval(() => {
      socket.emit("timer")

        socket.on("timer_response", (data) => {
            setTimer(data)
            if (timer === 0) {setTimeout(() => {}, 1000);}
            setRoundDeadline(Date.now() + timer*1000)
        })
    }, 1000);


            return() => {
                    socket.off("timer_response")
                    clearInterval(interval);
            }
  },);
        useEffect(() => {
        socket.emit("take_all_data", roomName)
        socket.emit("timer")

        socket.on("timer_response", (data) => {
                        setTimer(data)
            setRoundDeadline(Date.now() + timer*1000)
        })

    socket.on("vehicle_data:", (data) => {
        setRealPrice(data.data["fiyat"]);
        setVehicleData(data);
    });


    socket.on("leaderboard_data", (data) => {
        setLeaderboard(data);
    });

    socket.on("leaderboard_data_top3", (data) => {
        setTopThree(data);
    });

    return () => {
        socket.off("vehicle_data:");
        socket.off("leaderboard_data");
        socket.off("leaderboard_data_top3");
        socket.off("timer_response")
    };
}, [roomName, socket]);

// Yeni round başlat
const startNextRound = () => {
    setShowResults(true)

        socket.emit("take_all_data", roomName)

    setRoundDeadline(Date.now() + timer*1000+5000);

};

// useEffect(() => {
//     if (top3Received && leaderboardReceived) {
//
//         setShowResults(true);
//     }
// }, [top3Received, leaderboardReceived]);

// SADECE SONUÇ GÖSTERME
useEffect(() => {
    if (showResults) {
        const timer = setTimeout(() => {
            setShowResults(false); // Sonuç ekranını kapat
        socket.emit("take_all_data", roomName)
        socket.emit("timer")


        }, 6000);


        return () => clearTimeout(timer);
    }
}, [roomName, showResults, socket]);

// Yeni ilan geldiğinde -> yeni round başlat
useEffect(() => {

    // Yalnızca normal ekranda ve ilan varsa
    if (vehicleData && !showResults) {
        const delay = setTimeout(() => {
            startNextRound();
        }, timer*1000); // kullanıcı tahmin yapmak için 20 saniye alır

        return () => clearTimeout(delay);
    }
}, [vehicleData, showResults, startNextRound, timer]);



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
                                cookie={cookie}

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
            <Chatbox
            cookie={cookie}
            />
        </Box>
    );
}

export default RoomPage;
