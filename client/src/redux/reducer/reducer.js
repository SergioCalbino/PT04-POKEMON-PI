import { GET_ALL_POKEMONS, GET_ALL_POKEMONS_DB, GET_POKEMON_ID, GET_POKEMON_NAME, GET_TYPES, CREATE_POKEMON, ORDER_ASC } from "../actions/actions";

const initialState = {
    allPokemons: [],
    filterOrder: [],
    pokemon: {},
    types: []
}
 function compare( array, prop ) {
     let order = array.sort(function(a,b) { 
    if ( a[prop] < b[prop] ){
      return -1;
    }
    if ( a[prop] > b[prop] ){
      return 1;
    }
    return order;
})
  }


export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_POKEMONS: {
            return {
                ...state,
                allPokemons: action.payload
            }

        }

        case GET_ALL_POKEMONS_DB: {
            return {
                ...state,
                allPokemons: action.payload
            }
        }
        case GET_POKEMON_ID: {
            return {
                ...state,
                pokemon: action.payload
            }
        }
        case GET_POKEMON_NAME: {
            return {
                ...state,
                pokemon: action.payload
            }
        }
        case GET_TYPES: {
            return {
                ...state,
                types: action.payload
            }
        }
        case CREATE_POKEMON: {
            return {
                ...state,
                allPokemons: state.allPokemons.concat(action.payload)
            }
        }
        case ORDER_ASC: {
            let ordername = compare(state.allPokemons, "name")
            return {
                ...state,
                filterOrder: ordername
            }
        }
            
            
    
        default: return state;
            
    };

};
