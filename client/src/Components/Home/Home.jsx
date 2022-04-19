import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getAllPokemons, getTypes, filterByType} from '../../redux/actions/actions'
import SearchBar from '../SearchBar/SearchBar';




function Home() {
    
    const dispatch = useDispatch();
    const pokemon = useSelector((initialState) => initialState);
    
    
    useEffect(() => {
        dispatch(getAllPokemons())
    },[dispatch]);

  
    return (
        <div>
        {pokemon ? pokemon.allPokemons?.map(poke =>(
            <div key={poke.name}>
                <p>name: {poke.name}</p>
                <p>weight: {poke.weight} lbs</p>
                <p>{poke.types[0].name}</p>
                <p>{poke.types[0].url}</p>
                
                <img src={poke.img} alt='#'/>
    
            </div>
    
        )
        ): <h1>Hola.. Cargando</h1>}
    
        </div>
      )
    
}

export default Home