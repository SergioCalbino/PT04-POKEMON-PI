import React, { useEffect } from 'react'
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
//import { options } from '../../../../api/src/routes/index.js';
import {postPokemon, getTypes} from '../../redux/actions/actions.js'
import {Link} from 'react-router-dom'

function CreatePokemon() {
    
    let newPokemon = {
        name: "",
        life: 0,
        strength: 0,
        defense: 0,
        speed: 0,
        height: 0,
        weight: 0,
        types: []
    }

    const types = useSelector(state => state)
    const [input, setInput] = useState(newPokemon)
    const [error, setError] = useState()
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTypes())
    }, [dispatch])


    function handleSubmit(e) {
        e.preventDefault()
        console.log(input)
        dispatch(postPokemon(input))
        alert('Create Pokemon Success')
    }

     // Estados del input para todos los campos menos el type  
    function handleInput(e) {
        if(e.target.name === 'name') {
            setInput({
                ...input,
                [e.target.name]:e.target.value
            });
        } else if (e.target.name === 'type') {
            setInput({
                ...input,
                [e.target.name]: [...input.types, parseInt(e.target.value)]
            });
        } else {
            setInput({
                ...input,
                [e.target.name]: parseInt(e.target.value)
            });
        }
            
        
            setError(validator({
                ...input, 
                [e.target.name] : e.target.value
            }))
    }

    // Estados del Type
    // function handleType(e) {
    //     setInput(
    //         {
    //         ...input,
    //         types: [...input.types, e.target.value]
    //     })
    //     setError(validator({
    //         ...input,
    //         types: [...input.types, e.target.value]
    //     }))
    // }

    function validator(input) {
        let error = {};
        if(!input.name || input.name > 30)
        error.name = "El nombre es requerido y no puede tener mas de 30 caracteres"
        
        if(input.life <= 0 || input.life >= 200)
        error.life = "Los valores permitidos deben ser mayores a 0 y menor a 200"
        
        if(input.strength <= 0 || input.strength >= 150)
        error.strength = "Los valores permitidos deben ser mayores a 0 y menor a 150"

        if(input.defense <= 0 || input.defense >= 200)
        error.defense = "Los valores permitidos deben ser mayores a 0 y menor a 200"

        if(input.height <=0 || input.height >= 150)
        error.height = "Los valores permitidos deben ser mayores a 0 y menor a 150"

        if(input.weight <=0 || input.weight >= 300)
        error.weight = "Los valores permitidos deben ser mayores a 0 y menor a 200"

        // if(input.types.length >= 2)
        // error.types = "El pokemon no puede tener mas de dos Types" 

        return error
    }

   

  return (
    <div>
        <h1>Create your Pokemon</h1>
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

            <select name='type' onChange={handleInput}>
                <option value=''> Elija tipo</option> 
                {types.types?.map(ty =>
                <option value={ty.id}>{ty.name}</option>)}

            </select>
            <button type='submit'>Create Pokemon</button>


        </form>

        <Link to={'/home'}>
        <button>Back</button>
        </Link>
    </div>
  )
}

export default CreatePokemon