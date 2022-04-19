import { GET_ALL_POKEMONS, 
    GET_ALL_POKEMONS_DB, 
    GET_POKEMON_ID, 
    GET_POKEMON_NAME, 
    GET_TYPES, CREATE_POKEMON, 
    // ORDER_ASC, 
    // ORDER_DESC, 
    ORDER_BY_NAME,
    ORDER_STRENGTH_ASC,
    ORDER_STRENGTH_DESC,
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
                allpokemons: [action.payload]
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
            let allpoke = state.allPokemons
            const filter = allpoke.filter(el => (el.types[1]) ? el.types[1].name  === action.payload : el.types[0].name === action.payload)
            return {
                ...state,
                filterOrder: filter
        }
    }


        case ORDER_BY_NAME: {
            

		if(action.payload === 'asc') {
           let resultOrd = [...state.allPokemons]
         resultOrd = compare(state.allPokemons, "name")
            state = { ...state, filterOrder: resultOrd }
            return state;
        } 

        if(action.payload === 'desc') {
            let ordeNameDesc = [...state.allPokemons]
            ordeNameDesc = compare(state.allPokemons, "name").reverse()
            return {
                ...state,
                filterOrder: ordeNameDesc }
        }

            
        return state.allPokemons   
    }

        // case ORDER_ASC: {
        //     let orderNameAsc = compare(state.allPokemons, "name")
        //     return {
        //         ...state,
        //         filterOrder: orderNameAsc
        //     }
        // }
        // case ORDER_DESC: {
        //     let ordeNameDesc = compare(state.allPokemons, "name").reverse()
        //     return {
        //         ...state,
        //         filterOrder: ordeNameDesc
        //     }
        // }
        // case ORDER_STRENGTH_ASC:{
        //     let orderStrngthAsc = compare(state.allPokemons, "strength")
        //     return {
        //         ...state,
        //         filterOrder: orderStrngthAsc
        //     }
        // }
        // case  ORDER_STRENGTH_DESC: {
        //     let orderStrngthDesc = compare(state.allPokemons, "strength").reverse()
        //     return {
        //         ...state,
        //         filterOrder: orderStrngthDesc
        //     }

        //}
            
            
    
        default: return state;
            
    };

};
