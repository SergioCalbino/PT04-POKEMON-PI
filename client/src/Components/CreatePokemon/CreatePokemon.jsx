import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { options } from '../../../../api/src/routes/index.js';
import { postPokemon, getTypes, deleteState, getAllPokemons } from "../../redux/actions/actions.js";
import { Link, useNavigate } from "react-router-dom";

function CreatePokemon() {
  let newPokemon = {
    name: "",
    life: 0,
    strength: 0,
    defense: 0,
    speed: 0,
    height: 0,
    weight: 0,
    types: [],
  };

  const types = useSelector((state) => state);
  const [input, setInput] = useState(newPokemon);
  const [error, setError] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate()

  function validator(input, item) {
      let error = {}
      if(item === 'name') {
        if (!input.name) error.name = 'Name is required';
        if (!/^[a-zA-Z ]*$/.test(input.name)) error.name = 'Name is invalid: must be letters only';
        if (input.name.length > 20 || input.name.length < 3) error.name = 'Name must be between 3 and 20 characters'
    }
   
    if(item === 'life') {
        if (input.life <= 0 || input.life >= 200) error.life = "Los valores permitidos deben ser mayores a 0 y menor a 200";
    }

    if(item === 'strength') {
        if (input.strength <= 0 || input.strength >= 150) error.strength ="Los valores permitidos deben ser mayores a 0 y menor a 150";
    }
    
    if(item === 'defense') {
        if (input.defense <= 0 || input.defense >= 200) error.defense = "Los valores permitidos deben ser mayores a 0 y menor a 200";
    }
    
    if(item === 'speed') {
        if(input.speed <= 0 || input.speed >= 150) error.speed = "Los valores permitidos deben ser mayores a 0 y menor a 150";
    }
    
    if(item === 'height') {
        if (input.height <= 0 || input.height >= 150) error.height = "Los valores permitidos deben ser mayores a 0 y menor a 150";
    }
    
    if(item === 'weight') {
        if (input.weight <= 0 || input.weight >= 300) error.weight = "Los valores permitidos deben ser mayores a 0 y menor a 200";
    }

    if(item === 'types') {
    if(input.types.length >= 2) error.types = "El pokemon no puede tener mas de dos Types"
    }
    return error;
  }

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  const isObjEmpty = () =>{
    for (var prop in error) {
        if (error.hasOwnProperty(prop)) return true;
    }    
    return false;
}

  function handleSubmit(e) {
    e.preventDefault();
   
    
    dispatch(postPokemon(input));
    alert("Create Pokemon Success");
    setInput(newPokemon)
    setError({})
    navigate('/home')
    dispatch(deleteState())
    dispatch(getAllPokemons())

  }

  // Estados del input para todos los campos menos el type
  function handleInput(e) {
     
      let item = e.target.name
    if (item === "name") {
        setError(validator({...input, [item]: e.target.value}, item))
      setInput({
        ...input,
        [item]: e.target.value,
      });
    } else if (item === "type") {
    setError(validator({...input, [item]: e.target.value}, item))
      setInput({
        ...input,
        [item]: [...input.types, parseInt(e.target.value)],
      });
    } else {
        setError(validator({...input, [item]: e.target.value}, item))
      setInput({
        ...input,
        [item]: parseInt(e.target.value),
      });
    }

    

    

    // setError(
    //   validator({
    //     ...input,
    //     [e.target.name]: e.target.value,
    //   })
    // );
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

  return (
    <div>
      <h1>Create your Pokemon</h1>
      <form onSubmit={handleSubmit}>
        <label>Name</label>

        <input
          name="name"
          type="text"
          onChange={handleInput}
          autoComplete="off"
          required
        />
        {error.name && <p>{error.name}</p>}

        <label>Life</label>

        <input
          name="life"
          type="number"
          onChange={handleInput}
          autoComplete="off"
          required
        />
        {error.life && <p>{error.life}</p>}

        <label>Strength</label>

        <input
          name="strength"
          type="number"
          onChange={handleInput}
          autoComplete="off"
          required
        />
        {error.strength && <p>{error.strength}</p>}

        <label>Defense</label>
        <input
          name="defense"
          type="number"
          onChange={handleInput}
          autoComplete="off"
          required
        />
        {error.defense && <p>{error.defense}</p>}

        <label>Speed</label>
        <input
          name="speed"
          type="number"
          onChange={handleInput}
          autoComplete="off"
          required
        />
        {error.speed && <p>{error.speed}</p>}

        <label>Height</label>
        <input
          name="height"
          type="number"
          onChange={handleInput}
          autoComplete="off"
          required
        />
        {error.height && <p>{error.height}</p>}

        <label>Weight</label>
        <input name="weight" type="number" onChange={handleInput} autoComplete="off" required />
        {error.weight && <p>{error.weight}</p>}

        <select name="type" onChange={handleInput} autoComplete="off" required >
          <option value=""> Elija tipo</option>
          {types.types?.map((ty) => (
            <option value={ty.id}>{ty.name}</option>
          ))}
        </select>
        {error.types && <p>{error.types}</p>}


        

        <button type="submit" disabled={isObjEmpty(error)}>Create Pokemon</button>

       
      </form>

      <Link to={"/home"}>
        <button>Back</button>
      </Link>
    </div>
  );
}

export default CreatePokemon;

