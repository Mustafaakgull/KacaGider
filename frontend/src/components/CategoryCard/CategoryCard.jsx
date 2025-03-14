import './CategoryCard.css';
import CarRentalIcon from '@mui/icons-material/CarRental';
import BikeScooterIcon from '@mui/icons-material/BikeScooter';
import BusAlertIcon from '@mui/icons-material/BusAlert';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { Card, CardContent, Typography, Box } from '@mui/material';

const iconMap = {
    Car: <CarRentalIcon className={'category-icon'} />,
    Bike: <BikeScooterIcon className={'category-icon'} />,
    Bus: <BusAlertIcon className={'category-icon'} />,
    Truck: <LocalShippingIcon className={'category-icon'} />
};

function CategoryCard({ category }) {
    return (
        <Card className="card-container">
            <CardContent className={'content'}>
                <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
                    {iconMap[category.name] || <CarRentalIcon className={'category-icon'}/>}
                    <Typography variant="h6">{category.name}</Typography>
                    <Typography variant="body1">{category.player} Players</Typography>
                </Box>
            </CardContent>
        </Card>
    );
}

export default CategoryCard;
