import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
 import {validator} from '../../Utils/validatorFunction.js'
 import {isNotEmpty} from "../../Utils/objectError.js"
import {
  postPokemon,
  getTypes,
  getAllPokemons,
  deleteState
} from "../../redux/actions/actions.js";
import { Link, useNavigate } from "react-router-dom";
import Styles from "../CreatePokemon/CreatePokemon.module.css";

function CreatePokemon() {
  let newPokemon = {
    name: "",
    life: 0,
    strength: 0,
    defense: 0,
    speed: 0,
    height: 0,
    weight: 0,
    img: "",
    types: [],
  };

  const typeState = useSelector((state) => state);
  const message = useSelector((state) => state.message);
  const [input, setInput] = useState(newPokemon);
  const [error, setError] = useState({});
  const [submit, setSubmit] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

 
  //probando la creacion
  useEffect(() => {
    // if (message?.length > 1) { 
    //   alert(message)
    dispatch(getAllPokemons())
    return ()=> {setInput(newPokemon)}
  }, []);

  
  

  useEffect(() => {
    if (
      input.types.length < 3 &&
      input.types.length > 0 &&
      !isNotEmpty(error)
    ) {
      setSubmit(true);
    } else {
      setSubmit(false);
    }
  }, [error, input, submit]);

  useEffect(() => {
    dispatch(getTypes());
    dispatch(getAllPokemons());
  }, [dispatch]);



  function handleSubmit(e) {
    e.preventDefault();

   
    dispatch(postPokemon(input));
    // setInput({
    //   name: "",
    //   life: 0,
    //   strength: 0,
    //   defense: 0,
    //   speed: 0,
    //   height: 0,
    //   weight: 0,
    //   img: "",
    //   types: [],
    // });
    //dispatch(getAllPokemons());

    
    
    setError({});
    // dispatch(deleteState())
   // navigate("/home");
  }

  // Estados del input y el Types
  function handleInput(e) {
    if (e.target.name === "name") {
      setError(validator({ ...input, [e.target.name]: e.target.value }));
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    }

    if (e.target.name === "life") {
      setError(validator({ ...input, [e.target.name]: e.target.value }));
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    }

    if (e.target.name === "strength") {
      setError(validator({ ...input, [e.target.name]: e.target.value }));
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    }

    if (e.target.name === "defense") {
      setError(validator({ ...input, [e.target.name]: e.target.value }));
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    }

    if (e.target.name === "speed") {
      setError(validator({ ...input, [e.target.name]: e.target.value }));
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    }

    if (e.target.name === "height") {
      setError(validator({ ...input, [e.target.name]: e.target.value }));
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    }

    if (e.target.name === "weight") {
      setError(validator({ ...input, [e.target.name]: e.target.value }));
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    }

    if (e.target.name === "types") {
      setError(validator({ ...input, [e.target.name]: e.target.value }));
      setInput({
        ...input,
        [e.target.name]: [...input.types, parseInt(e.target.value)],
      });
    }

    if(e.target.name === "img") {
       
      setInput({
        ...input, [e.target.name]: e.target.value
      })
    }
  }

  const deleteType = (e) => {
    let ty = input.types.filter((t) => t !== parseInt(e.target.value));
    setInput({
      ...input,
      types: ty,
    });
  };

  return (
    <>
      <div className={Styles.header}>
        {/* <h1>Create your Pokemon</h1> */}
        <Link to={"/home"}>
          <button className={Styles.button}>Back</button>
        </Link>
      </div>
      <div className={Styles.general}>
        {/* <div > */}

        <div className={Styles.border}>
          <form onSubmit={handleSubmit}>
            <label>Name</label>

            <input
              className={Styles.input}
              name="name"
              type="text"
              onChange={handleInput}
              autoComplete="off"
              value={input.name}
              required
            />
            {error.name && <p>{error.name}</p>}

            <label>Life</label>

            <input
              className={Styles.input}
              name="life"
              type="number"
              onChange={handleInput}
              autoComplete="off"
              value={input.life}
              required
            />
            {error.life && <p>{error.life}</p>}

            <label>Strength</label>

            <input
              name="strength"
              type="number"
              onChange={handleInput}
              autoComplete="off"
              value={input.strength}
              required
            />
            {error.strength && <p>{error.strength}</p>}

            <label>Defense</label>
            <input
              name="defense"
              type="number"
              onChange={handleInput}
              autoComplete="off"
              value={input.defense}
              required
            />
            {error.defense && <p>{error.defense}</p>}

            <label>Speed</label>
            <input
              name="speed"
              type="number"
              onChange={handleInput}
              autoComplete="off"
              value={input.speed}
              required
            />
            {error.speed && <p>{error.speed}</p>}

            <label>Height</label>
            <input
              name="height"
              type="number"
              onChange={handleInput}
              autoComplete="off"
              value={input.height}
              required
            />
            {error.height && <p>{error.height}</p>}

            <label>Weight</label>
            <input
              name="weight"
              type="number"
              onChange={handleInput}
              autoComplete="off"
              value={input.weight}
              required
            />
            {error.weight && <p>{error.weight}</p>}

            <label>Image</label>
            <input
              name="img"
              type="text"
              onChange={handleInput}
              placeholder="Insert URL"
              value={input.img}
            />

            <select
              name="types"
              onChange={handleInput}
              autoComplete="off"
              required
            >
              <option value=""> Choose Type</option>
              {typeState.types?.map((ty) => (
                <option value={ty.id}>{ty.name}</option>
              ))}
            </select>
            {error.types && <p>{error.types}</p>}

            <button className={Styles.button2} type="submit" disabled={!submit}>
              Create Pokemon
            </button>
          </form>
        </div>

        {/* </div> */}

        <div>
          <h3>Pokemons to add the Type</h3>
          <table className={Styles.table}>
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
                      <button onClick={deleteType} value={t}>
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {/* <div className={Styles.img}></div> */}
      </div>
    </>
  );
}

export default CreatePokemon;
