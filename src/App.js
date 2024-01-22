import './App.css';
import LeftSidePanel from './components/LeftSidePanel';
import MusicPlayer from './components/MusicPlayer';
import TopBar from './components/TopBar';
import MainPanel from './components/MainPanel';
import ModalCmp from './components/ModalCmp';
import LoginPage from './components/LoginPage';
import VideoPlayer from './components/VideoPlayer';
import useHooksLogic from './useHooksLogic';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  
  const [state, dispatch] = useHooksLogic()
    
  return (
    <BrowserRouter>
      <div className="app bg-black">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/:page" element={
            <>
              <LeftSidePanel state={state} dispatch={dispatch} />
              <MusicPlayer state={state} dispatch={dispatch} />
              <MainPanel state={state} dispatch={dispatch} />
              <TopBar state={state} dispatch={dispatch} />
              <ModalCmp state={state} dispatch={dispatch} />
              <VideoPlayer state={state} dispatch={dispatch}/>
            </>
          } />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
