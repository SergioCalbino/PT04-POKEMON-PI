import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  deleteState
} from "../../redux/actions/actions";
import { getPokemonsByname } from "../../redux/actions/actions.js";
import "../Nav/Nav.css";

function Nav() {
  const [search, setSearch] = useState("");
  const types = useSelector((state) => state.types);
  const pokemons = useSelector((state) => state);
  const dispatch = useDispatch();
  //const [currentPage, setCurrentPage] = useState(1)

  function searchPokemon(e) {
    // Para realizar la busqueda por nombre
    e.preventDefault();
    // dispatch(getPokemonsByname(search))
    if (!/[a-zA-Z]/.test(search)) {
      //Constatamos que lo que se ingrese sea un nombre
      alert("El caracter ingresado no es valido");
      setSearch("");
    } else {
      dispatch(getPokemonsByname(search));
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
    return
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

  return (
    <div className="button-nav">
      <div className="select">
        <select onChange={hanlderFilterByType}>
          {types.map((ty, i) => (
            <option key={i} name={ty.name}>
              {" "}
              {ty.name}
            </option>
          ))}
        </select>
      </div>

     
      <div className="select">
        <select onChange={handlerName}>
          <option value="">Ordena por Nombre</option>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
      </div>

      <div className="select">
        <select onChange={handlerStrength}>
          <option value="">Ordena por Fuerza</option>
          <option value="asc">More strength</option>
          <option value="desc">Less strength</option>
        </select>
      </div>

      <div className="select">
        <select onChange={handlerOriginPokemons}>
          <option value=""> Select origin from Pokemons</option>
          <option value="Data Base"> Pokemons from Data Base</option>
          <option value="Api"> Pokemons from Api</option>
        </select>
      </div>
      <div >
        <input className=""
          onChange={handleInputChange}
          value={search}
          placeholder="Buscar por nombre"
        />
        <button className="button" onClick={searchPokemon}>Search</button>
      </div>
    </div>
  );
}

export default Nav;


{/* <p>Select Temperaments</p>
                    <select multiple name = 'temperaments' onChange = {handleInputChange}>
                        {
                            temperaments.map(t => (
                                <option key = {t.id} value = {t.id}>{t.temperaments}</option>
                            ))
                        }
                    </select> */}