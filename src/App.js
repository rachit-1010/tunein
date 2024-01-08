import logo from './logo.svg';
import './App.css';
import LeftSidePanel from './components/LeftSidePanel';
import MusicPlayer from './components/MusicPlayer';
import TopBar from './components/TopBar';
import MainPanel from './components/MainPanel';
import ModalCmp from './components/ModalCmp';
import { useState } from 'react';

function App() {
  return (
    <div className="app bg-black">
      <LeftSidePanel />
      <MusicPlayer />
      <TopBar />
      <MainPanel />

    </div>
  );
}

export default App;
