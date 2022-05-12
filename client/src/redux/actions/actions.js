
import axios from "axios";

export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS";
export const GET_ALL_POKEMONS_DB = "GET_ALL_POKEMONS_DB";
export const GET_POKEMON_ID = "GET_POKEMON_ID";
export const GET_POKEMON_NAME = "GET_POKEMON_NAME";
export const GET_TYPES = "GET_TYPES";
export const CREATE_POKEMON = "CREATE_POKEMON";
export const FILTER_BY_TYPE = "FILTER_BY_TYPE"; // Ordena por tipo
export const ORDER_NAME_ASC = "ORDER_NAME_ASC"; // Ordena por nombre de forma Ascendente
export const ORDER_NAME_DESC = "ORDER_NAME_DESC"; // Ordena por nombre de forma Descendente
export const ORDER_STRENGTH_ASC = "ORDER_STRENGTH_ASC";
export const ORDER_STRENGTH_DESC = "ORDER_STRENGTH_DESC";
export const GET_ALL_POKEMONS_BY_DB = "GET_ALL_POKEMONS_BY_DB";
export const GET_ALL_POKEMONS_BY_API = "GET_ALL_POKEMONS_BY_API";
export const CLEAR = "CLEAR";
export const GET_NAME = "GET_NAME";

//Action para traernos todos los pokemons
export function getAllPokemons() {
  return async (dispatch) => {
    try {
      const response = await axios("http://localhost:3001/pokemons");
      return dispatch({
        type: GET_ALL_POKEMONS,
        payload: response.data,
      });
    } catch (error) {
      return dispatch(error, "Ha ocurrido un error");
    }
  };
}

//Action para traerme todos los pokemons de la DB
export function allPokemonsByDb() {
  return {
    type: GET_ALL_POKEMONS_DB,
  };
}

//Actions para traernos los pokemons por id
export function getPokemonsById(id) {
  return async (dispatch) => {
    try {
      const response = await axios(`http://localhost:3001/pokemons/${id}`);
      return dispatch(
          { type: GET_POKEMON_ID, 
            payload: response.data });
    } catch (error) {
      return dispatch(error, "Ha ocurrido un error");
    }
  };
}

//Actions para traer los pokemons por nombre

export function getPokemonByname(name) {
  return async function (dispatch) {
    try {
      const resp = await axios.get(`http://localhost:3001/pokemons?name=${name}`);
      return dispatch({
        type: GET_POKEMON_NAME,
        payload: [resp.data],
      });
    } catch (error) {
      return dispatch({
        type: GET_POKEMON_NAME,
        payload: { error: "error" },
      });
    }
  };
}

export function getTypes() {
  return async function (dispatch) {
    try {
      const resp = await axios("http://localhost:3001/types");
      return dispatch({
        type: GET_TYPES,
        payload: resp.data,
      });
    } catch (error) {
      return dispatch({
        type: GET_TYPES,
        payload: error,
      });
    }
  };
}

//Actions post a pokemons

export function postPokemon(inputFormPoke) {
  return async function (dispatch) {
    try {
      let resp;
      await axios.post("http://localhost:3001/pokemons", inputFormPoke)
      .then((r) => (resp = r.data));
      alert(resp);
      return dispatch({
        type: CREATE_POKEMON,
        payload: resp,
      });
    } catch (error) {
      return error;
    }
  };
}

// Funciones de filtrado y borrado para mantener el estado

export function deleteState() {
  return {
    type: CLEAR,
  };
}

export function orderNameAsc() {
  return {
    type: ORDER_NAME_ASC,
  };
}

export function orderNameDesc() {
  return {
    type: ORDER_NAME_DESC,
  };
}

export function ordeByStrengthAsc() {
  return {
    type: ORDER_STRENGTH_ASC,
  };
}

export function ordeByStrengthDesc() {
  return {
    type: ORDER_STRENGTH_DESC,
  };
}

export function filterByType(type) {
  // console.log(type)
  return {
    type: FILTER_BY_TYPE,
    payload: type,
  };
}

export function getPokemonsByDb() {
  return {
    type: GET_ALL_POKEMONS_BY_DB,
  };
}

export function getPokemonsByApi() {
  return {
    type: GET_ALL_POKEMONS_BY_API,
  };
}
