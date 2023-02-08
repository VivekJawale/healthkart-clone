import './App.css';
import MainRoutes from './Routes/MainRoutes';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainChatbot from './Components/Chatbot/MainChatbot';
import "react-multi-carousel/lib/styles.css";
import Navbar from './Pages/Navbar';
import SubNav from './Pages/SubNav';
import { Box } from '@chakra-ui/react';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div style={{ paddingTop: "70px" }}> <SubNav /></div>
      <MainRoutes />
      <MainChatbot />
    </div>
  );
}

export default App;
