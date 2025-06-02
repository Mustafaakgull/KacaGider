import React, {useState} from 'react';
import CategoryCard from '../CategoryCard/CategoryCard.jsx';
import './Categories.css';
import {Button} from "@mui/material";
import PrivateRoom from "../PrivateRoom/PrivateRoom.jsx";

function Categories() {
    const [openDialog, setOpenDialog] = useState(false);

    const categories = [
        {id: 1, name: 'Car', player: 26},
        {id: 2, name: 'Motorcycle', player: 15},
    ];

    return (
        <>
            <div className="categories">
                {categories.map((category) => (
                    <CategoryCard className={'category-card'} key={category.id} category={category}/>
                ))}
            </div>
            <div className={'button-container'}>
                <Button variant="contained" className={'button'} onClick={() => setOpenDialog(true)}>
                    Create Private Room
                </Button>
                <PrivateRoom open={openDialog} onClose={() => setOpenDialog(false)} />
            </div>

        </>
    );
}

export default Categories;
