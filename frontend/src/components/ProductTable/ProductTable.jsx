import GuessControls from "../GuessControls/GuessControls.jsx";
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
import {socket} from "../../SocketioConnection.jsx";



const ProductCard = ({  listing }) => {
    console.log("lsiting",listing);
    const [price, setPrice] = useState(0);
    const [guessCount, setGuessCount] = useState(0);
    const [feedback, setFeedback] = useState("");




    if (!listing) return null; // veya <CircularProgress />

    const images = typeof listing.photos === "string"
        ? JSON.parse(listing.photos)
        : listing.photos || [];
    console.log("lsiting", listing);
    console.log("listin data",listing.data);
    console.log("listing data data",listing.data.data);

    console.log("imagessss", images);
    const product = listing.data;

    const handleChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setPrice(value === "" ? 0 : Number(value));
        }
    };




    // const settings = {
    //     dots: true,
    //     infinite: true,
    //     speed: 500,
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     arrows: true,
    //     fade: true,
    //     waitForAnimate: false
    // };

    return (
        <Card
            className={'card'}
            sx={{
                width: 500,
                maxWidth: "100%",
                margin: "auto",
                padding: 5,
                backgroundColor: "#424242", // gri arka plan
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
                {/* Araç adı */}
                <Typography
                    className={'name info'}
                    variant="h6"
                    sx={{ color: "white", mb: 2 }}
                >
                    {product["Marka"]} {product["Model"]}
                </Typography>

                {/* Diğer özellikler: 2'şerli Grid şeklinde */}
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: 1,
                    }}
                >
                    {[
                        {
                            label: "Yıl",
                            value: product["Yıl"],
                            icon: <CalendarTodayIcon fontSize="small" sx={{ color: "#fbc02d" }} />,
                        },
                        {
                            label: "Kilometre",
                            value: product["Kilometre"],
                            icon: <SpeedIcon fontSize="small" sx={{ color: "#fbc02d" }} />,
                        },
                        {
                            label: "Yakıt Tipi",
                            value: product["Yakıt Tipi"],
                            icon: <LocalGasStationIcon fontSize="small" sx={{ color: "#fbc02d" }} />,
                        },
                        {
                            label: "Vites Tipi",
                            value: product["Vites Tipi"],
                            icon: <SettingsIcon fontSize="small" sx={{ color: "#fbc02d" }} />,
                        },
                        {
                            label: "Motor Gücü",
                            value: product["Motor Gücü"],
                            icon: <FlashOnIcon fontSize="small" sx={{ color: "#fbc02d" }} />,
                        },
                        {
                            label: "Ağır Hasarlı",
                            value: product["Ağır Hasarlı"],
                            icon: <WarningIcon fontSize="small" sx={{ color: "#fbc02d" }} />,
                        },
                        {
                            label: "Boya-değişen",
                            value: product["Boya-değişen"],
                            icon: <ColorLensIcon fontSize="small" sx={{ color: "#fbc02d" }} />,
                        },
                        {
                            label: "Kimden",
                            value: product["Kimden"],
                            icon: <PersonIcon fontSize="small" sx={{ color: "#fbc02d" }} />,
                        },
                    ].map(({ label, value, icon }, i) => (
                        <Box
                            key={i}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                backgroundColor: "#616161",
                                border: "1px solid #fbc02d",
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
                    ))}
                </Box>

            </CardContent>

            <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <TextField
                    variant="outlined"
                    type="number"
                    value={price}
                    onChange={handleChange}
                    disabled={guessCount >= 3}
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
                    onChange={(amount) => {
                        setPrice(prev => Math.max(prev + amount, 0));
                    }}
                />

                <Button
                    fullWidth
                    variant="contained"
                    disabled={guessCount >= 3}
                    sx={{ mt: 4, color: '#fff', backgroundColor: '#fbc02d' }}
                >
                    Submit Guess
                </Button>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
