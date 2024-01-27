import './App.css';
import { BrowserRouter } from "react-router-dom";
import RoutesCmp from './components/RoutesCmp';
import { AuthProvider } from './components/AuthContext';

function App() {
  
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="app bg-black">
          <RoutesCmp />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
