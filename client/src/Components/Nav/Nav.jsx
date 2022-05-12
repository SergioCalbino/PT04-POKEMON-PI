import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  ordeByStrengthAsc,
  getTypes,
  filterByType,
  orderNameAsc,
  orderNameDesc,
  getAllPokemons,
  ordeByStrengthDesc,
  getPokemonsByDb,
  getPokemonsByApi,
  deleteState,
  getPokemonByname,
} from "../../redux/actions/actions";

import Styles from "../Nav/Nav.module.css";

function Nav() {
  const [search, setSearch] = useState("");
  const types = useSelector((state) => state.types);
  const pokemons = useSelector((state) => state);
  const dispatch = useDispatch();
  //const [currentPage, setCurrentPage] = useState(1)

  function searchPokemon(e) {
    // Para realizar la busqueda por nombre
    e.preventDefault();
   
    if (!/[a-zA-Z]/.test(search)) {
      //Constatamos que lo que se ingrese sea un nombre
      alert("Invalid Character");
      setSearch("");
    } else {
      dispatch(getPokemonByname(search));
      setSearch("");
    }
  }

  function handleInputChange(e) {
    setSearch(e.target.value);
  }

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  function hanlderFilterByType(e) {
    //Filtro los tipos de pokemon
    e.preventDefault();
    dispatch(filterByType(e.target.value));
  }

  function handlerName(e) {
    // Filtro por orden alfabetico
    if (e.target.value === "asc") {
      return dispatch(orderNameAsc());
    }

    if (e.target.value === "desc") {
      return dispatch(orderNameDesc());
    }

    if (e.target.value === "") {
      return dispatch(deleteState());
    }

    return;
  }

  function handlerStrength(e) {
    // Filtro los pokemons por Fuerza
    if (e.target.value === "asc") {
      return dispatch(ordeByStrengthAsc());
    }
    if (e.target.value === "desc") {
      return dispatch(ordeByStrengthDesc());
    }
    if (e.target.value === "") {
      return dispatch(deleteState());
    }
    return;
  }

  function handlerOriginPokemons(e) {
    // Filtro los pokemons por origen
    if (e.target.value === "Data Base") {
      dispatch(getPokemonsByDb());
    }
    if (e.target.value === "Api") {
      dispatch(getPokemonsByApi());
    }
    if (e.target.value === "") {
      delete pokemons.filter;
      dispatch(getAllPokemons());
    }
  }

  function clear() {
    return dispatch(deleteState());
  }

  return (
    <>
      <div className={Styles.img}></div>
      <div className={Styles.container}>
        <div>
          <div className={Styles.title}>
            <span>Select type of Pokemon</span>
            <select onChange={hanlderFilterByType}>
              {types.map((ty, i) => (
                <option key={i} name={ty.name}>
                  {" "}
                  {ty.name}
                </option>
              ))}
            </select>
          </div>

          <select onChange={handlerName}>
            <option value="">Order By Name</option>
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>

          <select onChange={handlerStrength}>
            <option value="">order By Strength</option>
            <option value="asc">More strength</option>
            <option value="desc">Less strength</option>
          </select>

          <select onChange={handlerOriginPokemons}>
            <option value=""> Select origin from Pokemons</option>
            <option value="Data Base"> Pokemons from Data Base</option>
            <option value="Api"> Pokemons from Api</option>
          </select>
        </div>

        <form onSubmit={searchPokemon}>
          <input
            className=""
            onChange={handleInputChange}
            value={search}
            placeholder="Search Name"
          />
          <button className={Styles.button}>
            Search
          </button>
        </form>

        <div>
          <button className={Styles.button} onClick={clear}>
            Clear{" "}
          </button>
        </div>
      </div>
    </>
  );
}

export default Nav;
