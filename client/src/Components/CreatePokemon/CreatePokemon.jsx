import React from 'react'
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {postPokemon} from '../../redux/actions/actions.js'

function CreatePokemon() {
    let newPokemon = {
        name: "",
        life: "",
        strength: "",
        defense: "",
        speed: "",
        height: "",
        weight: ""
    }

    const [input, setInput] = useState(newPokemon)
    const dispatch = useDispatch()

    function handleSubmit(e) {
        e.preventDefault()
        console.log('hola')
        dispatch(postPokemon(input))
    }

    function handleInput(e) {
        setInput({...input,[e.target.name]:e.target.value})
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input name ='name' type="text" onChange={handleInput}></input>
            
            <label>Life</label>
            <input name ='life' type="number" onChange={handleInput}></input>
            
            <label>Strength</label>
            <input name ='strength' type="number" onChange={handleInput}></input>
            
            <label>Defense</label>
            <input name ='defense' type="number" onChange={handleInput}></input>
            
            <label>Speed</label>
            <input name ='speed' type="number" onChange={handleInput}></input>
            
            <label>Height</label>
            <input name ='height' type="number" onChange={handleInput}></input>
            
            <label>Weight</label>
            <input name ='weight' type="number" onChange={handleInput}></input>
            <button type='submit'>Crear Pokemon</button>
            
        </form>
    </div>
  )
}

export default CreatePokemon