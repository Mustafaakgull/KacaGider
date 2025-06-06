import {Button, Card, CardContent, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useContext,useEffect, useRef, useState} from "react";
import Box from "@mui/material/Box";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SpeedIcon from '@mui/icons-material/Speed';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import SettingsIcon from '@mui/icons-material/Settings';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import WarningIcon from '@mui/icons-material/Warning';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import PersonIcon from '@mui/icons-material/Person';
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import Stack from "@mui/material/Stack";
import { SocketContext } from '../../SocketioConnection.jsx';


const ProductCard = ({ vehicle_data, isAuthenticated, showResults}) => {
    const [price, setPrice] = useState(0);
    const [priceInput, setPriceInput] = useState("");
    const [feedback, setFeedback] = useState("");
    const inputRef = useRef(null);
    const socket = useContext(SocketContext);
    const [hint, setHint] = useState("")
    const [guessCount, setGuessCount] = useState(0);
    // const [value, setValue] = useState("");
    useEffect(() => {
        if(inputRef.current) {
            inputRef.current.focus();
        }
    }, [])

    useEffect(() => {
        if (showResults) {
            setGuessCount(0)

    }

  }, [showResults]);


    if (!vehicle_data) return null;

    const images = typeof vehicle_data.photos === "string"
        ? JSON.parse(vehicle_data.photos)
        : vehicle_data.photos || [];

    const product = vehicle_data.data;
    const socketClick = () => {
        socket.emit("guess_button_clicked", price);
        console.log("knk tikladim",price)
        socket.on("hint_message", data => {
        setHint(data);
        socket.off("hint_message")
    })
    };

    const handleChange = (e) => {
         let value = e.target.value.replace(/\./g, "");
        if (/^\d*$/.test(value)) {
            const num = Number(value);
            setPrice(num);
            setPriceInput(num.toLocaleString("tr-TR"));
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && isAuthenticated && guessCount < 3) {
            setGuessCount(prev => prev + 1);
            socketClick()
        }
    };


    const GuessControls = ({ onChange, disabled }) => {
        const handleChange = (amount) => {
            if (!disabled) onChange?.(amount);
        };

        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 3,
                }}
            >
                <Stack spacing={2}>
                    <Stack direction="row" spacing={2} justifyContent="center">
                        <Button
                            variant="contained"
                            disabled={disabled}
                            onClick={() => handleChange(100000)}
                            sx={{
                                backgroundColor: '#2e7d32',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: '#1b5e20',
                                },
                                '&.Mui-disabled': {
                                    backgroundColor: '#2e7d32',
                                    color: 'white',
                                    opacity: 0.5,
                                },
                            }}
                        >
                            + 100.000 ₺
                        </Button>
                        <Button
                            variant="contained"
                            disabled={disabled}
                            onClick={() => handleChange(25000)}
                            sx={{
                                backgroundColor: '#2e7d32',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: '#1b5e20',
                                },
                                '&.Mui-disabled': {
                                    backgroundColor: '#2e7d32',
                                    color: 'white',
                                    opacity: 0.5,
                                },
                            }}
                        >
                            + 25.000 ₺
                        </Button>
                        <Button
                            variant="contained"
                            disabled={disabled}
                            onClick={() => handleChange(5000)}
                            sx={{
                                backgroundColor: '#2e7d32',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: '#1b5e20',
                                },
                                '&.Mui-disabled': {
                                    backgroundColor: '#2e7d32',
                                    color: 'white',
                                    opacity: 0.5,
                                },
                            }}
                        >
                            + 5.000 ₺
                        </Button>
                    </Stack>

                    <Stack direction="row" spacing={2} justifyContent="center">
                        <Button
                            variant="contained"
                            disabled={disabled}
                            onClick={() => handleChange(-100000)}
                            sx={{
                                backgroundColor: '#d32f2f',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: '#9a0007',
                                },
                                '&.Mui-disabled': {
                                    backgroundColor: '#d32f2f',
                                    color: 'white',
                                    opacity: 0.5,
                                },
                            }}
                        >
                            − 100.000 ₺
                        </Button>
                        <Button
                            variant="contained"
                            disabled={disabled}
                            onClick={() => handleChange(-25000)}
                            sx={{
                                backgroundColor: '#d32f2f',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: '#9a0007',
                                },
                                '&.Mui-disabled': {
                                    backgroundColor: '#d32f2f',
                                    color: 'white',
                                    opacity: 0.5,
                                },
                            }}
                        >
                            − 25.000 ₺
                        </Button>
                        <Button
                            variant="contained"
                            disabled={disabled}
                            onClick={() => handleChange(-5000)}
                            sx={{
                                backgroundColor: '#d32f2f',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: '#9a0007',
                                },
                                '&.Mui-disabled': {
                                    backgroundColor: '#d32f2f',
                                    color: 'white',
                                    opacity: 0.5,
                                },
                            }}
                        >
                            − 5.000 ₺
                        </Button>
                    </Stack>
                </Stack>
            </Box>
        );
    };


    return (
        <Card
            className={'card'}
            sx={{
                width: 600,
                maxWidth: "100%",
                margin: "auto",
                padding: 5,
                backgroundColor: "rgb(40,40,40)",
                borderRadius: 2
            }}
        >
            <Slider
                dots={"true"}
                infinite={"true"}
                speed={500}
                slidesToShow={1}
                slidesToScroll={1}
                arrows={"true"}
                fade={"true"}
            >
                {images.map((img, index) => (
                    <div key={index}>
                        <img
                            src={img}
                            alt={`image-${index}`}
                            style={{
                                width: "100%",
                                maxHeight: "350px",
                                objectFit: "cover",
                                borderRadius: "8px"
                            }}
                        />
                    </div>
                ))}
            </Slider>

            <CardContent className={'product-info-container'}>
                <Typography
                    className={'name info'}
                    variant="h6"
                    sx={{ color: "white", mb: 2, display: "flex", justifyContent: "center", textAlign: "center" }}
                >
                    {product["Marka"]} {product["Model"]}
                </Typography>

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: 1,
                    }}
                >
                    {[
                        {
                            key: "Yıl",
                            label: "Year",
                            icon: <CalendarTodayIcon fontSize="small" sx={{ color: "#fbc02d" }} />,
                        },
                        {
                            key: "Kilometre",
                            label: "Kilometer",
                            icon: <SpeedIcon fontSize="small" sx={{ color: "#fbc02d" }} />,
                        },
                        {
                            key: "Yakıt Tipi",
                            label: "Fuel Type",
                            icon: <LocalGasStationIcon fontSize="small" sx={{ color: "#fbc02d" }} />,
                        },
                        {
                            key: "Vites Tipi",
                            label: "Gearbox",
                            icon: <SettingsIcon fontSize="small" sx={{ color: "#fbc02d" }} />,
                        },
                        {
                            key: "Motor Gücü",
                            label: "Engine Power",
                            icon: <FlashOnIcon fontSize="small" sx={{ color: "#fbc02d" }} />,
                        },
                        {
                            key: "Kasa Tipi",
                            label: "Body Type",
                            icon: <DirectionsCarIcon  fontSize="small" sx={{ color: "#fbc02d" }} />,
                        },
                        {
                            key: "Boya-değişen",
                            label: "Paint/Changed Parts",
                            icon: <ColorLensIcon fontSize="small" sx={{ color: "#fbc02d" }} />,
                        },
                        {
                            key: "Kimden",
                            label: "Seller",
                            icon: <PersonIcon fontSize="small" sx={{ color: "#fbc02d" }} />,
                        },
                    ].map(({ key, label, icon }, i) => {
                        let value = product[key];
                        if (label === "Body Type")
                        if (label === "Gearbox")
                            value = value === "Manuel" ? "Manual"
                                : value === "Otomatik" ? "Automatic"
                                    : value === "Yarı Otomatik" ? "Semi-Automatic"
                                        : value;

                        if (label === "Fuel Type")
                            value = value === "Benzin" ? "Petrol"
                                : value === "Dizel" ? "Diesel"
                                    : value === "Hibrit" ? "Hybrid"
                                        : value === "Elektrik" ? "Electric"
                                            : value;

                        if (label === "Seller")
                            value = value === "Bireysel" ? "Individual"
                                : value === "Galeriden" ? "Dealer"
                                    : value === "Sahibinden" ? "Individual"
                                        : value;

                        if (label === "Paint/Changed Parts")
                            value = value === "Belirtilmemiş" ? "no"
                                : "yes"


                        return (
                            <Box
                                key={i}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    backgroundColor: "#111",
                                    border: "1px solid #fff",
                                    borderRadius: 1,
                                    px: 1.5,
                                    py: 1,
                                    color: "white",
                                }}
                            >
                                {icon}
                                <Typography variant="body2" sx={{ ml: 1 }}>
                                    <strong>{label}:</strong> {value}
                                </Typography>
                            </Box>
                        );
                    })}
                </Box>
            </CardContent>

            <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <TextField
                    inputRef={inputRef}
                    variant="outlined"
                    value={priceInput}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    disabled={guessCount >= 3}
                    placeholder={"0"}
                    label="Your Guess"
                    fullWidth
                    sx={{
                        mt: 2,
                        '& .MuiOutlinedInput-root': {
                            color: 'white',
                            '& fieldset': {
                                borderColor: 'white',
                            },
                            '&:hover fieldset': {
                                borderColor: '#aaa',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#fff',
                            },
                        },
                        '& .MuiInputLabel-root': {
                            color: 'white',
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: '#fff',
                        },
                    }}
                    InputProps={{ style: { color: 'white' } }}
                    InputLabelProps={{ style: { color: 'white' } }}
                />


                {feedback && (
                    <Typography sx={{ mt: 1 }} color="info.main">
                        {feedback} + "saasass"
                    </Typography>
                )}

                <GuessControls
                    disabled={!isAuthenticated || guessCount >= 3}
                    onChange={(amount) => {
                        setPrice(prev => {
                            const updated = Math.max(prev + amount, 0);
                            setPriceInput(updated.toLocaleString("tr-TR"));
                            return updated;
                        });
                    }}
                />


                <Button
                    fullWidth
                    variant="contained"
                    disabled={guessCount >= 3 || !isAuthenticated}
                    onClick={() => {
                        setGuessCount(prev => prev + 1);
                        // handleChange()
                        socketClick()
                    }}
                    sx={{
                        mt: 2,
                        backgroundColor: '#fbc02d',
                        fontWeight: 'bold',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: '#c49000',
                        },
                        '&.Mui-disabled': {
                            backgroundColor: '#fbc02d',
                            color: 'white',
                            opacity: 0.5,
                        },
                    }}
                >
                    Submit Guess
                </Button>
                <Box sx={{color:'#fff'}}> {hint} </Box>
                {!isAuthenticated && (
                    <Typography sx={{ mt: 2 }} color="error">
                        Lütfen tahmin yapmak için giriş yapın.
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
};

export default ProductCard;
