import { GET_ALL_POKEMONS, 
    GET_ALL_POKEMONS_DB, 
    GET_POKEMON_ID, 
    GET_POKEMON_NAME, 
    GET_TYPES, CREATE_POKEMON, 
    ORDER_BY_NAME,
    ORDER_STRENGTH,
    FILTER_BY_TYPE } from "../actions/actions";

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
    return 0
})
return order;
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
        //Aca empiezo con los ordenamientos
        case FILTER_BY_TYPE: {
            let allType = state.types
            const filter = allType.filter(el => (el.types[1]) ? el.types[1].name  === action.payload : el.types[0].name === action.payload)
            return {
                ...state,
                filterOrder: filter
        }
    }


        case ORDER_BY_NAME: {
            

		if(action.payload === 'asc') {
           let orderAsc = state.allPokemons
           orderAsc = compare(state.allPokemons, "name")
           return { 
               ...state, 
               allPokemons: orderAsc
            
        } 
    }

        if(action.payload === 'desc') {
            let orderDesc = state.allPokemons
            orderDesc = compare(state.allPokemons, "name").reverse()
            return {
                ...state,
                allPokemons: orderDesc }
        }

            
        return state  
    }

        
        case ORDER_STRENGTH: {
            if(action.payload === 'less') {
            let orderStrngth = state.allPokemons
            orderStrngth = compare(state.allPokemons, "strength")
            return {
                ...state,
                allPokemons: orderStrngth
            }
        }

        if(action.payload === 'more') {
            let orderStrngthDesc = state.allPokemons
            orderStrngthDesc = compare(state.allPokemons, "strength").reverse()
            return {
                ...state,
                allPokemons: orderStrngthDesc
            }
        }
        return state
        }
       
            
            
    
        default: return state;
            
    };

};
