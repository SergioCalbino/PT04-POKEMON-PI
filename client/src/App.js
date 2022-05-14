import './App.css';
import {Routes, Route} from 'react-router-dom';
import LandingPage from './Components/LandingPage/LandingPage';
import Home from './Components/Home/Home.jsx'
import CreatePokemon from './Components/CreatePokemon/CreatePokemon';
import DetailPokemon from './Components/DetailPokemon/DetailPokemon'


function App() {
  return (
    <div className="app"> 
    
    
    <Routes>
    <Route path ='/' element={<LandingPage/>}/>
    <Route path ='/home' element={<Home/>}/>
    <Route exact path = '/pokemons' element={<CreatePokemon/>}/>
    <Route exact path = '/pokemon/:id' element={<DetailPokemon/>}/>
   
    
    </Routes>
    </div>
  );
}

export default App;
