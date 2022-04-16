import './App.css';
import {Routes, Route} from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import Home from './Components/Home'

function App() {
  return (
    <div className="App"> 
    <Routes>
    <Route path ='/' element={<LandingPage/>}/>
    <Route path ='/home' element={<Home/>}/>
    
    </Routes>
    </div>
  );
}

export default App;
