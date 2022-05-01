import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { options } from '../../../../api/src/routes/index.js';
import {
  postPokemon,
  getTypes,
  deleteState,
  getAllPokemons,
} from "../../redux/actions/actions.js";
import { Link, useNavigate } from "react-router-dom";
import Styles from '../CreatePokemon/CreatePokemon.module.css'

function CreatePokemon() {
  let newPokemon = {
    name: "",
    life: 0,
    strength: 0,
    defense: 0,
    speed: 0,
    height: 0,
    weight: 0,
    img: " ",
    types: [],
  };

  const typeState = useSelector((state) => state);
  const [input, setInput] = useState(newPokemon);
  const [error, setError] = useState({});
  const [submit, setSubmit] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function validator(input, item) {
    let error = {};
   
      if (!input.name) error.name = "Name is required";
      if (!/^[a-zA-Z ]*$/.test(input.name)) error.name = "Name is invalid: must be letters only";
      if (input.name.length > 20 || input.name.length < 3) error.name = "Name must be between 3 and 20 characters";
    

    
      if (input.life <= 0 || input.life >= 200) error.life = "Los valores permitidos deben ser mayores a 0 y menor a 200";
    

    
      if (input.strength <= 0 || input.strength >= 150) error.strength = "Los valores permitidos deben ser mayores a 0 y menor a 150";
    

   
      if (input.defense <= 0 || input.defense >= 200) error.defense = "Los valores permitidos deben ser mayores a 0 y menor a 200";
    

    
      if (input.speed <= 0 || input.speed >= 150) error.speed = "Los valores permitidos deben ser mayores a 0 y menor a 150";
    

    
      if (input.height <= 0 || input.height >= 150) error.height = "Los valores permitidos deben ser mayores a 0 y menor a 150";
  

    
      if (input.weight <= 0 || input.weight >= 300) error.weight = "Los valores permitidos deben ser mayores a 0 y menor a 200";
    
      // if (input.types[2]) error.types = "El pokemon no puede tener mas de dos Types";
    
    return error;
  }

  
  useEffect(() => {
      if (input.types.length < 3 && input.types.length > 0 && !isNotObjEmpty(error)) {
        setSubmit(true);
      } else {
        setSubmit(false);
      }}, [error, input, submit]);

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  const isNotObjEmpty = () => {
    for (var prop in error) {
      if (error.hasOwnProperty(prop)) return true;
    }
    return false;
  };

  function handleSubmit(e) {
    e.preventDefault();

    console.log(input);
    dispatch(postPokemon(input));

   // alert("Create Pokemon Success");
    setInput(newPokemon);
    setError({});
    navigate("/home");
    dispatch(getAllPokemons());
  }

  // Estados del input para todos los campos menos el type
  function handleInput(e) {
    
    if ( e.target.name === "name") {
      setError(validator({ ...input, [ e.target.name]: e.target.value }));
      setInput({
        ...input,
        [ e.target.name]: e.target.value,
      });
    }

    if ( e.target.name === "life") {
      setError(validator({ ...input, [e.target.name]: e.target.value }));
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    }

    if ( e.target.name === "strength") {
      setError(validator({ ...input, [e.target.name]: e.target.value }));
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    }

    if ( e.target.name === "defense") {
      setError(validator({ ...input, [e.target.name]: e.target.value }));
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    }

    if ( e.target.name === "speed") {
      setError(validator({ ...input, [e.target.name]: e.target.value }));
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    }

    if ( e.target.name === "height") {
      setError(validator({ ...input, [e.target.name]: e.target.value }));
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    }

    if ( e.target.name === "weight") {
      setError(validator({ ...input, [e.target.name]: e.target.value }));
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    }

    if ( e.target.name === "types") {
      setError(validator({ ...input, [e.target.name]: e.target.value }));
      setInput({
        ...input,
        [e.target.name]: [...input.types, parseInt(e.target.value)],
      });
    }
  }

  const deleteType = (e) => {
    console.log(typeof e.target.value)
    let ty = input.types.filter((t) => t !== parseInt(e.target.value));
    console.log(typeof ty[0])
    setInput({
      ...input,
      types: ty,
    });
  };

  return (
    <div  className={Styles.create}>
      <h1>Create your Pokemon</h1>
      <form onSubmit={handleSubmit}>
       
     
        <label className={Styles.select}  >Name</label>

        <input 
          name="name"
          type="text"
          onChange={handleInput}
          autoComplete="off"
          required
        />
        {error.name && <p>{error.name}</p>}
       
        <label className={Styles.select} >Life</label>

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
        <input
          name="weight"
          type="number"
          onChange={handleInput}
          autoComplete="off"
          required
        />
        {error.weight && <p>{error.weight}</p>}
        
        <label>Image</label>
        <input
          name="image"
          type="text"
          onChange={handleInput}
          placeholder='Insert URL'
        />
        
        
        <select name="types" onChange={handleInput} autoComplete="off" required>
          <option value=""> Elija tipo</option>
          {typeState.types?.map((ty) => (
            <option value={ty.id}>{ty.name}</option>
          ))} 
        </select>
        {error.types && <p>{error.types}</p>}


        <button className={Styles.createPoke} type="submit" disabled={!submit}>
          Create Pokemon
        </button>
      </form>
      
        <div>
          <h3>Pokemons to add the Type</h3>
          <table>
            <thead>
              <tr>
                <th>Type id</th>
                <th>To Add</th>
              </tr>
            </thead>
            <tbody>
              {input.types &&
                input.types.map((t) => (
                  <tr key={t}>
                    <td>{t}</td>
                    <td>
                      <button  onClick={deleteType} value={t}>
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

      <Link to={"/home"}>
        <button className={Styles.back}>Back</button>
      </Link>
    </div>
  );
}

export default CreatePokemon;
