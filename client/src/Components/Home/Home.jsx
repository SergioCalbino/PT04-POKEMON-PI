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

    
    return (

        <>
        <Nav/>
        <div>
        {
            <div >
              {pokemonStore ? pokemonStore.allPokemons.map((po) => (
                <div >
                  <PokeCard key={po.name} props={po} />
                </div>
                
              ))
              : <h1>Cargando</h1>
              }
        </div>
        }
        </div>
        </>
      )
    
}

export default Home

