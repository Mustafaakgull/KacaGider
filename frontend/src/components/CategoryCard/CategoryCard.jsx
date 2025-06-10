import './CategoryCard.css';
import CarRentalIcon from '@mui/icons-material/CarRental';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { Car } from "phosphor-react";
import React, {useContext} from "react";
import { FaMotorcycle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { SocketContext } from '../../SocketioConnection.jsx';

import {  TwoWheeler } from "@mui/icons-material";
import GarageIcon from '@mui/icons-material/Garage';
const iconMap = {
    Car: <Car size={66} className={'category-icon'} />,
    Motorcycle: <FaMotorcycle size={66} className={'category-icon'} />,
    'Rented-Vehicles': <GarageIcon className={'category-icon'} style={{ fontSize: 66 }} />,
};



function CategoryCard({ category, cookie }) {
    const socket = useContext(SocketContext);
    const navigate = useNavigate(); // ← hook tanımı





    const handleClick = () => {
        const path = category.name.toLowerCase(); // örn. 'Car' → 'car'
        socket.emit("join_room", `${path}`, cookie)
        navigate(`/room/${path}`);

    };
    return (
        <Card className="card-container" onClick={handleClick}>
            <CardContent className={'content'}>
                <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
                    {iconMap[category.name] || <GarageIcon className={'category-icon'}/>}
                    <Typography variant="h6">{category.name}</Typography>
                </Box>
            </CardContent>
        </Card>
    );
}

export default CategoryCard;