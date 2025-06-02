import {Button, Card, CardContent, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import { useState} from "react";
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


const ProductCard = ({ listing, isAuthenticated, guessCount, setGuessCount }) => {
    const [price, setPrice] = useState("");
    const [feedback, setFeedback] = useState("");


    if (!listing) return null;

    const images = typeof listing.photos === "string"
        ? JSON.parse(listing.photos)
        : listing.photos || [];

    const product = listing.data;

    const handleChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setPrice(value === "" ? 0 : Number(value));
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
                        <Button variant="contained" color="success" disabled={disabled} onClick={() => handleChange(100000)}>
                            + 100.000 ₺
                        </Button>
                        <Button variant="contained" color="success" disabled={disabled} onClick={() => handleChange(25000)}>
                            + 25.000 ₺
                        </Button>
                        <Button variant="contained" color="success" disabled={disabled} onClick={() => handleChange(5000)}>
                            + 5.000 ₺
                        </Button>
                    </Stack>
                    <Stack direction="row" spacing={2} justifyContent="center">
                        <Button variant="contained" color="error" disabled={disabled} onClick={() => handleChange(-100000)}>
                            − 100.000 ₺
                        </Button>
                        <Button variant="contained" color="error" disabled={disabled} onClick={() => handleChange(-25000)}>
                            − 25.000 ₺
                        </Button>
                        <Button variant="contained" color="error" disabled={disabled} onClick={() => handleChange(-5000)}>
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
                    variant="outlined"
                    type="number"
                    value={price}
                    onChange={handleChange}
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
                        {feedback}
                    </Typography>
                )}

                <GuessControls
                    disabled={!isAuthenticated}
                    onChange={(amount) => {
                        setPrice(prev => Math.max(prev + amount, 0));
                    }}
                />

                <Button
                    fullWidth
                    variant="contained"
                    disabled={guessCount >= 3 || !isAuthenticated}
                    onClick={() => {
                        setGuessCount(prev => prev + 1);
                    }}
                    sx={{ mt: 2, color: '#fff', backgroundColor: '#fbc02d' }}
                >
                    Submit Guess
                </Button>

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
