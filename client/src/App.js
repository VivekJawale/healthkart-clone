import './App.css';
import MainRoutes from './Routes/MainRoutes';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainChatbot from './Components/Chatbot/MainChatbot';
import "react-multi-carousel/lib/styles.css";

function App() {
  return (
    <div className="App">
      <MainRoutes />
      <MainChatbot/>
    </div>
  );
}

export default App;
