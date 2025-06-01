import GuessControls from "../GuessControls/GuessControls.jsx";
import {Button, Card, CardContent, Slider, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useEffect, useState} from "react";

const ProductCard = ({ socket, listing }) => {
    const [price, setPrice] = useState(0);
    const [guessCount, setGuessCount] = useState(0);
    const [feedback, setFeedback] = useState("");

    if (!listing) return null; // veya <CircularProgress />

    const images = listing?.photos || []; // photos Redis'e eklenmişse
    const product = listing;

    const handleChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setPrice(value === "" ? 0 : Number(value));
        }
    };

    const sendGuess = () => {
        if (guessCount >= 3 || !socket) return;

        socket.emit("make_guess", { guess: price });

        socket.once("guess_feedback", (data) => {
            setFeedback(data.message);
        });

        setGuessCount(prev => prev + 1);
    };

    useEffect(() => {
        const resetGuess = () => {
            setGuessCount(0);
            setFeedback("");
            setPrice(0);
        };

        socket?.on("round_end_results", resetGuess);
        return () => {
            socket?.off("round_end_results", resetGuess);
        };
    }, [socket]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        waitForAnimate: false
    };

    return (
        <Card className={'card'} sx={{ maxWidth: 500, margin: "auto", padding: 5 }}>
            <Slider {...settings}>
                {images?.map((img, i) => (
                    <div key={i}>
                        <img src={img} alt={`product-${i}`} style={{ width: "100%", borderRadius: 8 }} />
                    </div>
                ))}
            </Slider>

            <CardContent className={'product-info-container'}>
                <Typography className={'name info'} variant="h6">
                    {product["Marka"]} {product["Model"]}
                </Typography>
                <Typography className={'model-year info'}>
                    {product["Yıl"]}
                </Typography>
                <Typography className={'km info'}>
                    {product["Kilometre"]}
                </Typography>
                <Typography className={'fuel info'}>
                    {product["Yakıt Tipi"]}
                </Typography>
                <Typography className={'transmission info'}>
                    {product["Vites Tipi"]}
                </Typography>
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
                    onClick={sendGuess}
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
