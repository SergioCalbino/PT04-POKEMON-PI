import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getAllPokemons} from '../../redux/actions/actions'



function Home() {
    const dispatch = useDispatch();
    const pokemon = useSelector(state => state.allPokemons)
    
    useEffect(() => {
        dispatch(getAllPokemons())
    },[dispatch])
  
    return (
    <div>
    {pokemon && pokemon.map(poke =>(
        <div key={poke.name}>
            <p>name: {poke.name}</p>
            <p>weight: {poke.weight} lbs</p>
            <p>{poke.types[0].name}</p>
            <p>{poke.types[0].url}</p>
            
            <img src={poke.img} alt='#'/>

        </div>

    )
    )}

    </div>
  )
}

export default Home