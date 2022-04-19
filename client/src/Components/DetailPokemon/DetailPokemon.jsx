import React, { useEffect } from 'react'
import {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getPokemonsById} from '../../redux/actions/actions.js'
import {useParams} from 'react-router-dom'

function DetailPokemon() {
    const detail = useSelector(state=> state.pokemon)
    const {pokeId} = useParams()
    const dispatch = useDispatch();
    console.log(pokeId)
    console.log(detail)

    useEffect(() => dispatch(getPokemonsById(pokeId)),[])

    let pokeFilt = detail.filter((poke) => poke.id === pokeId)


  return (
    <div>
        <img src={pokeFilt.img} alt='#'/>
        <p>Name: {pokeFilt.name}</p>
        <button onClick={() => dispatch(getPokemonsById(pokeFilt))}>Mostrar</button>



    </div>
  )
}

export default DetailPokemon


