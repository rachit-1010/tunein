import './App.css';
import LeftSidePanel from './components/LeftSidePanel';
import MusicPlayer from './components/MusicPlayer';
import TopBar from './components/TopBar';
import MainPanel from './components/MainPanel';
import ModalCmp from './components/ModalCmp';
import LoginPage from './components/LoginPage';
import VideoPlayer from './components/VideoPlayer';
import useHooksLogic from './useHooksLogic';

function App() {
  

  const [state, dispatch] = useHooksLogic()

  return (
    <div className="app bg-black">

      {/* <LoginPage /> */}

      <LeftSidePanel state={state} dispatch={dispatch} />
      <MusicPlayer state={state} dispatch={dispatch} />
      <TopBar state={state} dispatch={dispatch} />
      <MainPanel state={state} dispatch={dispatch} />
      <ModalCmp state={state} dispatch={dispatch} />
      <VideoPlayer state={state} dispatch={dispatch}/>

    </div>
  );
}

export default App;
