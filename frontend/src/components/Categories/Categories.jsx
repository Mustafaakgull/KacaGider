import React, { useEffect, useState} from 'react';
import CategoryCard from '../CategoryCard/CategoryCard.jsx';
import './Categories.css';
import {Button} from "@mui/material";
import PrivateRoom from "../PrivateRoom/PrivateRoom.jsx";
import axios from "axios";

function Categories() {
    const [openDialog, setOpenDialog] = useState(false);
    const [cookie, setCookie] = useState(null)
    const [disabled, setDisabled] = useState(false);

    const categories = [
        {id: 1, name: 'Car'},
        {id: 2, name: 'Motorcycle'},
        {id: 3, name: 'Rented-Vehicles'}
    ];

     useEffect(() => {
    if (disabled) return;  // stop running if disabled
         console.log("category use effect içindeyim")
    try {
        axios.post('https://api.kacagider.net/whoami', {}, { withCredentials: true }
        ).then(response => {
            if (response.data.username !== null){

                setCookie(response.data.session_id)
                console.log("category if icindeyim", cookie)
                setDisabled(true);

            }
        });

    } catch (e) {
        console.error(e);
    }
  },);

    return (
        <>
            <div className="categories">
                {categories.map((category) => (
                    <CategoryCard className={'category-card'} key={category.id} category={category} cookie={cookie}

                    />

                ))}
            </div>


        </>
    );
}

export default Categories;
