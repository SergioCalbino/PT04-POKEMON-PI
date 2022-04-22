import React, { useEffect } from 'react'
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
//import { options } from '../../../../api/src/routes/index.js';
import {postPokemon, getTypes} from '../../redux/actions/actions.js'
import {Link} from 'react-router-dom'

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
    const types = useSelector(state => state)
    const [input, setInput] = useState(newPokemon)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTypes())
    }, [dispatch])

    function handleSubmit(e) {
        e.preventDefault()
        console.log('hola')
        dispatch(postPokemon(input))
    }

    function handleInput(e) {
        setInput({...input,[e.target.name]:e.target.value})
    }

    function handleType(e) {
        setInput({
            ...input,
            types: [...input.types.types, e.target.value]
        })
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

            {/* <select onChange={handleType}>
                {types.map(ty =>
                <option>{ty}</option>)}

            </select> */}
            <button type='submit'>Create Pokemon</button>


        </form>

        <Link to={'/home'}>
        <button>Back</button>
        </Link>
    </div>
  )
}

export default CreatePokemon