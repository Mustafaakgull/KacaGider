import './App.css';
import Navbar from './components/Navbar2/Navbar';
import Categories from "./components/Categories/Categories.jsx";
import Footer from "./components/Footer/Footer.jsx";
import RoomPage from "./Pages/RoomPage/RoomPage.jsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {socket, SocketContext} from "./SocketioConnection.jsx";
import UserRoomsPage from './Pages/UserRoomsPage/UserRoomsPage.jsx'; // 👈 yeni import


function App() {
    return (
        <SocketContext.Provider value={socket}>
            <Router>
                <div className="app-wrapper">
                    <Navbar />
                    <div className="app-content">
                        <Routes>
                            <Route path="/" element={<Categories />} />
                            <Route path="/room/:category" element={<RoomPage />} />
                            <Route path="/user-rooms" element={<UserRoomsPage />} />
                        </Routes>
                    </div>
                    <Footer />
                </div>
            </Router>
        </SocketContext.Provider>
    );
}


export default App;