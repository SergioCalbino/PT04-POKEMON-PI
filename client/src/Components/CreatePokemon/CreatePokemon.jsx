import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { validator } from "../../Utils/validatorFunction.js";
import { isObjEmpty } from "../../Utils/objectError.js";
import {
  postPokemon,
  getTypes,
  getAllPokemons,
} from "../../redux/actions/actions.js";
import { Link } from "react-router-dom";
import Styles from "../CreatePokemon/CreatePokemon.module.css";
import NavBar from "../Nav/Nav.jsx";
import Banner from "../Banner/Banner.jsx";

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

  const [input, setInput] = useState(newPokemon);
  const [error, setError] = useState({});
  const [submit, setSubmit] = useState(false);
  const dispatch = useDispatch();

  //probando la creacion
  useEffect(() => {
    dispatch(getAllPokemons());
    // return () => {
    //   setInput(newPokemon);
    // };
  }, []);

  useEffect(() => {
    if (input.types.length < 3 && input.types.length > 0 && isObjEmpty(error)) {
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
    setInput({
      name: "",
      life: 0,
      strength: 0,
      defense: 0,
      speed: 0,
      height: 0,
      weight: 0,
      img: "",
      types: [],
    });
    setError({});
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

    if (e.target.name === "img") {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
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
      {/* <div className={Styles.form_container}> */}
      <Banner/>
      <Link className={Styles.btn}  to={'/home'} > Back</Link>
        <form onSubmit={handleSubmit} className={Styles.pokemon_form}>
          <div className={Styles.form_group}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={input.name}
              onChange={handleInput}
              required
            />
            {error.name && <p>{error.name}</p>}
          </div>

          <div className={Styles.form_group}>
            <label htmlFor="life">Life:</label>
            <input
              type="number"
              id="life"
              name="life"
              value={input.life}
              onChange={handleInput}
              required
            />
            {error.life && <p>{error.life}</p>}
          </div>

          <div className={Styles.form_group}>
            <label htmlFor="strength">Strength:</label>
            <input
              type="number"
              id="strength"
              name="strength"
              value={input.strength}
              onChange={handleInput}
              required
            />
            {error.strength && <p>{error.strength}</p>}
          </div>

          <div className={Styles.form_group}>
            <label htmlFor="defense">Defense:</label>
            <input
              type="number"
              id="defense"
              name="defense"
              value={input.defense}
              onChange={handleInput}
              required
            />
            {error.defense && <p>{error.defense}</p>}
          </div>

          <div className={Styles.form_group}>
            <label htmlFor="speed">Speed:</label>
            <input
              type="number"
              id="speed"
              name="speed"
              value={input.speed}
              onChange={handleInput}
              required
            />
            {error.speed && <p>{error.speed}</p>}
          </div>

          <div className={Styles.form_group}>
            <label htmlFor="height">Height:</label>
            <input
              type="number"
              id="height"
              name="height"
              value={input.height}
              onChange={handleInput}
              required
            />
            {error.height && <p>{error.height}</p>}
          </div>

          <div className={Styles.form_group}>
            <label htmlFor="weight">Weight:</label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={input.weight}
              onChange={handleInput}
              required
            />
            {error.weight && <p>{error.weight}</p>}
          </div>

          <div className={Styles.form_group}>
            <label htmlFor="img">Image:</label>
            <input
              type="url"
              id="img"
              name="img"
              value={input.img}
              onChange={handleInput}
              required
            />
            {error.img && <p>{error.img}</p>}
          </div>

          <div className={Styles.form_group}>
            <label htmlFor="types">Type:</label>
            <select
              id="types"
              name="types"
              value={input.types}
              onChange={handleInput}
            >
              <option value=""> Choose Type </option>
              {typeState.types?.map((ty) => (
                <option value={ty.id}>{ty.name}</option>
              ))}
              {error.types && <p>{error.types}</p>}
            </select>
          </div>
          <div className={Styles.form_group}>
            <button type="submit" disabled={!submit}>
              Create Pokemon
            </button>
          </div>
          <table className={Styles.pokemon_table}>
            <thead>
              <tr>
                <th>Selected Types</th>
              </tr>
            </thead>
            <tbody>
              {input.types?.map((type, index) => (
                <tr key={index}>
                  <td>{type}</td>
                  <td>
                    <button onClick={deleteType} value={type}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </form>
      {/* </div> */}
    </>
  );
}

export default CreatePokemon;
