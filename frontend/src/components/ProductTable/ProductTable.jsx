import React, { useState } from "react";
import {Card, CardContent, Typography, TextField, Button, InputAdornment} from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ProductTable.css"; // Stil dosyanın yüklü olduğuna emin ol
import CurrencyLiraIcon from '@mui/icons-material/CurrencyLira';

const ProductCard = () => {
    const images = [
        "/mercedes-photos/1.jpg",
        "/mercedes-photos/2.jpg",
        "/mercedes-photos/3.jpg",
        "/mercedes-photos/4.jpg",
    ];
    const product = {
        name: "Mercedes S580",
        modelYear: 2016,
        km: 118900,
        transmission: 'automatic',
        fuel: 'gasoline',
    }


    const [price, setPrice] = useState(0);
    const handleChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) { // Sadece sayıları kabul et
            setPrice(value === "" ? 0 : Number(value));
        }
    };

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
                {images.map((img, i) => (
                    <div key={i}>
                        <img src={img} alt={`product-${i}`} style={{ width: "100%", borderRadius: 8 }} />
                    </div>
                ))}
            </Slider>

            <CardContent className={'product-info-container'}>
                <Typography className={'name info'} variant="h6">{product.name} </Typography>
                <Typography className={'model-year info'}>{product.modelYear} </Typography>
                <Typography className={'km info'}>{product.km} km </Typography>
                <Typography className={'fuel info'}>{product.fuel} </Typography>
                <Typography className={'transmission info'}>{product.transmission}</Typography>
            </CardContent>

            <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <TextField
                    variant="outlined"
                    value={price}
                    onChange={handleChange}

                />
                <div style={{ marginTop: 10 }}>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={() => setPrice((prev) => prev + 5000)}
                    >
                        + 5.000 ₺
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => setPrice((prev) => Math.max(prev - 5000, 0))}
                        sx={{ marginLeft: 1 }}
                    >
                        - 5.000 ₺
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
