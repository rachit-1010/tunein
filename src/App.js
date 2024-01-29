import './App.css';
import { HashRouter } from "react-router-dom";
import RoutesCmp from './components/RoutesCmp';
import { AuthProvider } from './components/AuthContext';

function App() {
  
  return (
    <AuthProvider>
      <HashRouter>
        <div className="app bg-black">
          <RoutesCmp />
        </div>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
