import {
  GET_ALL_POKEMONS,
  GET_POKEMON_ID,
  GET_POKEMON_NAME,
  GET_TYPES,
  CREATE_POKEMON,
  ORDER_NAME_ASC,
  ORDER_NAME_DESC,
  ORDER_STRENGTH_ASC,
  ORDER_STRENGTH_DESC,
  FILTER_BY_TYPE,
  GET_ALL_POKEMONS_BY_DB,
  GET_ALL_POKEMONS_BY_API,
  CLEAR,
  
} from "../actions/actions";

const initialState = {
  allPokemons: [],
  pokemons: [],
  types: [],
  message: null,
};
function compare(array, prop) {
  let order = array.sort(function (a, b) {
    if (a[prop] < b[prop]) {
      return -1;
    }
    if (a[prop] > b[prop]) {
      return 1;
    }
    return 0;
  });
  return order;
}

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_POKEMONS: {
      return {
        ...state,
        allPokemons: action.payload,
      };
    }

    case GET_POKEMON_ID: {
      console.log(action.payload);
      return {
        ...state,
        pokemons: action.payload,
      };
    }
    case GET_POKEMON_NAME: {
      const filtered = action.payload;
      return {
        ...state,
        filter: filtered,
      };
    }

    case GET_TYPES: {
      return {
        ...state,
        types: action.payload,
      };
    }
    case CREATE_POKEMON: {
      return {
        ...state,
        message: action.payload,
      };
    }

  
    //Aca empiezo con los ordenamientos

    case CLEAR: {
      // delete state.filter;
      return {
        ...state,
        types: state.types,
        filter: state.allPokemons,
      };
    }

    case FILTER_BY_TYPE: {
      const cloneType = [...state.allPokemons];
      const filtered = cloneType.filter((poke) => poke.types?.filter((type) => {return type.name === action.payload}).length > 0);
          return {
        ...state,
        filter: filtered,
      };
    }

    case ORDER_NAME_ASC: {
      let asc = state.filter
        ? compare([...state.filter], "name")
        : compare([...state.allPokemons], "name");
      return {
        ...state,
        filter: asc,
      };
    }

    case ORDER_NAME_DESC: {
      let des = state.filter
        ? compare([...state.filter], "name").reverse()
        : compare([...state.allPokemons], "name").reverse();
      return {
        ...state,
        filter: des,
      };
    }

    case ORDER_STRENGTH_ASC: {
      let asc = state.filter
        ? compare([...state.filter], "strength").reverse()
        : compare([...state.allPokemons], "strength").reverse();
      return {
        ...state,
        filter: asc,
      };
    }
    case ORDER_STRENGTH_DESC: {
      let asc = state.filter
        ? compare([...state.filter], "strength")
        : compare([...state.allPokemons], "strength");
      return {
        ...state,
        filter: asc,
      };
    }

    case GET_ALL_POKEMONS_BY_DB: {
      const clonePoke = [...state.allPokemons];
      let filterDb = clonePoke.filter((filter) => /[a-zA-Z]/.test(filter.id));
      return {
        ...state,
        filter: filterDb,
      };
    }

    case GET_ALL_POKEMONS_BY_API: {
      const clonePoke = [...state.allPokemons];
      let filterApi = clonePoke.filter((filter) => !/[a-zA-Z]/.test(filter.id));
      return {
        ...state,
        filter: filterApi,
      };
    }

    default:
      return state;
  }
}

