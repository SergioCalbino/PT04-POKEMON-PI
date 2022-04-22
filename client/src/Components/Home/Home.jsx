import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getAllPokemons, getTypes, filterByType, handlerStrength} from '../../redux/actions/actions'
import Nav from '../Nav/Nav';
import PokeCard from '../PokeCard/PokeCard'




function Home() {
    
    const dispatch = useDispatch();
    const pokemonStore = useSelector((initialState) => initialState);
    
    
    useEffect(() => {
        dispatch(getAllPokemons())
    },[dispatch]);

    const [type, setType] = useState();
   
    const renderPokemons = () => {
        return pokemonStore.allPokemons.filter(pokemon => {
            if(type) return  pokemon.types.includes(type)
            return true
        }).map((po) => (
            <div >
              <PokeCard key={po.name} props={po} />
            </div>
            
          ))
        
    }

    
    return (

        <>
        <Nav/>
        <div>
        {
            <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)'}} >
              {pokemonStore ? renderPokemons()
              : <h1>Cargando</h1>
              }
        </div>
        }
        </div>
        </>
      )
    
}

export default Home

