import React, { useEffect } from 'react'
import {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getPokemonsById} from '../../redux/actions/actions.js'
import {useParams} from 'react-router-dom';
import {Link} from 'react-router-dom'

function DetailPokemon(props) {
    const detail = useSelector(state=> state)
    const {id} = useParams()
    const dispatch = useDispatch();
    console.log(id)
    

    useEffect(() => dispatch(getPokemonsById(id)),[dispatch])

    //let pokeFilt = detail.filter((poke) => poke.id === pokeId)


  return (
    <div>
   
        { detail.pokemons? (
          <div>
					<h3>Id: {detail.pokemons.id}</h3>
          <h3>Name: {detail.pokemons.name}</h3>
          <h3>Life: {detail.pokemons.life}</h3>
					<h3>strength: {detail.pokemons.strength}</h3>
					<h3>Defense: {detail.pokemons.defense}</h3>
					<h3>Speed: {detail.pokemons.speed}</h3>
					<h3>Height: {detail.pokemons.height}</h3>
					<h3>Weight: {detail.pokemons.weight}</h3>
          <img src={detail.pokemons.img}></img>
        
        </div>
        ): <h1>Cargando</h1>
        }
        <Link to={'/home'} >
      <button>Back to home</button>
    </Link>

    </div>
  )
}

export default DetailPokemon



{/* <h3>Types: {detail.pokemons.types}</h3> */}