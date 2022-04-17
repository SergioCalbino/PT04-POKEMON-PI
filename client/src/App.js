import './App.css';
import {Routes, Route} from 'react-router-dom';
import LandingPage from './Components/LandingPage/LandingPage';
import Home from './Components/Home/Home.jsx'
import SearchBar from './Components/SearchBar/SearchBar';
import CreatePokemon from './Components/CreatePokemon/CreatePokemon';
import DetailPokemon from './Components/DetailPokemon/DetailPokemon'

function App() {
  return (
    <div className="App"> 
    <SearchBar/>
    <Routes>
    <Route path ='/' element={<LandingPage/>}/>
    <Route path ='/home' element={<Home/>}/>
    <Route exact path = '/create' element={<CreatePokemon/>}/>
    <Route exact path = '/detailpokemon/:id' element={<DetailPokemon/>}/>
    
    </Routes>
    </div>
  );
}

export default App;
