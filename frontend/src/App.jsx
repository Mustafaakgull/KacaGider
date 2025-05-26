import './App.css';
import Navbar from './components/Navbar2/Navbar';
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Categories from "./components/Categories/Categories.jsx";
import ProductTable from "./components/ProductTable/ProductTable.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Contact from "./components/Contact/Contact.jsx";

function App() {
    return (
        <Stack spacing={2}>
            <Box>
                <Navbar/>
            </Box>
            <Categories/>
            <Contact/>
            <Stack direction="row" spacing={2} justifyContent="center">
                <Box sx={{border: '2px solid white'}} flex={2}></Box>
                <Box sx={{border: '2px solid white'}} flex={5}>
                    <ProductTable/>
                </Box>
                <Box sx={{border: '2px solid white'}} flex={2}></Box>
            </Stack>
            <Box>
                <Footer/>
            </Box>

        </Stack>

    );
}

export default App;