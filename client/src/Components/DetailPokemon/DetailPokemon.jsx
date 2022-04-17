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


  return (
    <div>
        <img src={detail.img} alt='#'/>
        <p>Name: {detail.name}</p>



    </div>
  )
}

export default DetailPokemon



// const house = useSelector(store => store.house)
// const dispa = useDispatch()
// const {houseId} = useParams()