import './App.css';
import Navbar from './components/Navbar2/Navbar';
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Categories from "./components/Categories/Categories.jsx";
import ProductTable from "./components/ProductTable/ProductTable.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Contact from "./components/Contact/Contact.jsx";
import RoomPage from "./Pages/RoomPage/RoomPage.jsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Categories />} />
                <Route path="/room/:category" element={<RoomPage />} />
            </Routes>
            <Footer />
        </Router>

    );
}

export default App;