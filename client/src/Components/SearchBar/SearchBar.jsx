import React from 'react'
import {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getPokemonsByname} from '../../redux/actions/actions.js'
import {Link} from 'react-router-dom';

function SearchBar() {

    const [poke, setPoke] = useState('');
    const namePokemon = useSelector(state => state.allpokemon)
    const dispatch = useDispatch();

    function handleChange(e) {
        setPoke(e.target.value)


    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(getPokemonsByname(poke))
        setPoke('')

    }
    
    return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type='text' value={poke} onChange={handleChange}/>
            <button type='submit'>Busca tu Pokemon</button>
        </form>
            
            
        
        
    </div>
  )
}

export default SearchBar