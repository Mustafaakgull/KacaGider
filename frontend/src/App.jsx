import './App.css';
import Navbar from './components/Navbar2/Navbar';
import ProductTable from "./components/ProductTable/ProductTable.jsx";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Categories from "./components/Categories/Categories.jsx";

function App() {
    return (
        <Stack spacing={2}>
            <Box>
                <Navbar/>
            </Box>
            <Categories/>
            <Stack direction="row" spacing={2} justifyContent="center">
                <Box sx={{border: '2px solid white'}} flex={2}></Box>
                <Box sx={{border: '2px solid white'}} flex={5}>
                    <ProductTable/>
                </Box>
                <Box  sx={{border: '2px solid white'}} flex={5}>
                    <ProductTable/>
                </Box>
                <Box sx={{border: '2px solid white'}} flex={2}></Box>
            </Stack>
        </Stack>
    );
}

export default App;