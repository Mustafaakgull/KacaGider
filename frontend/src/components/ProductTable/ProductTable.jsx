import GuessControls from "../GuessControls/GuessControls.jsx";
import {Button, Card, CardContent, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import { useState} from "react";
import Box from "@mui/material/Box";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



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
                maxWidth: 500,
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
                <Typography className={'name info'} variant="h6" sx={{ color: "white" }}>
                    {product["Marka"]} {product["Model"]}
                </Typography>

                {[
                    { label: "Yıl", value: product["Yıl"] },
                    { label: "Kilometre", value: product["Kilometre"] },
                    { label: "Yakıt Tipi", value: product["Yakıt Tipi"] },
                    { label: "Vites Tipi", value: product["Vites Tipi"] }
                ].map(({ label, value }, i) => (
                    <Box
                        key={i}
                        sx={{
                            backgroundColor: "#616161",
                            border: "1px solid #fbc02d",
                            borderRadius: 1,
                            px: 2,
                            py: 1,
                            mt: 1,
                            color: "white"
                        }}
                    >
                        <Typography variant="body2">
                            <strong>{label}:</strong> {value}
                        </Typography>
                    </Box>
                ))}
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
