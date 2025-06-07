import './CategoryCard.css';
import CarRentalIcon from '@mui/icons-material/CarRental';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { Car } from "phosphor-react";
import React, {useContext, useEffect, useState} from "react";
import { FaMotorcycle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { SocketContext } from '../../SocketioConnection.jsx';

import {  TwoWheeler } from "@mui/icons-material";
import axios from "axios"

const iconMap = {
    Car: <Car size={66} className={'category-icon'}/>,
    Bike: <FaMotorcycle size={66} className={'category-icon'} />,
};


function CategoryCard({ category }) {
    const socket = useContext(SocketContext);
    const navigate = useNavigate(); // ← hook tanımı
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


    const handleClick = () => {
        const path = category.name.toLowerCase(); // örn. 'Car' → 'car'
        socket.emit("join_room", `${path}`, cookie)
        navigate(`/room/${path}`);

    };
    return (
        <Card className="card-container" onClick={handleClick}>
            <CardContent className={'content'}>
                <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
                    {iconMap[category.name] || <TwoWheeler className={'category-icon'}/>}
                    <Typography variant="h6">{category.name}</Typography>
                    <Typography variant="body1">{category.player} </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}

export default CategoryCard;
