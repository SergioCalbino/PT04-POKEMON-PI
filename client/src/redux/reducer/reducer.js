import { 
    GET_ALL_POKEMONS, 
    GET_POKEMON_ID, 
    GET_POKEMON_NAME, 
    GET_TYPES, CREATE_POKEMON, 
    ORDER_NAME_ASC,
    ORDER_NAME_DESC,
    ORDER_STRENGTH_ASC,
    ORDER_STRENGTH_DESC,
    FILTER_BY_TYPE,
    GET_ALL_POKEMONS_BY_DB,
    GET_ALL_POKEMONS_BY_API 

    } from "../actions/actions";

const initialState = {
    allPokemons: [],
    pokemons: {},
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
                allPokemons: action.payload,
                
            }

        }

        case GET_POKEMON_ID: {
            console.log(action.payload)
            return {
                ...state,
                pokemons: action.payload
            }
        }
        case GET_POKEMON_NAME: {
            return {
                ...state,
                pokemons: action.payload
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
                ...state
                
            }
        }
        //Aca empiezo con los ordenamientos
        case FILTER_BY_TYPE: {
            const cloneType = [...state.allPokemons]
            
            const filtered = cloneType.filter(poke => poke.types?.filter(type => {
                console.log(type.name, action.payload)
                return type.name === action.payload}).length > 0)
            console.log('aca comienza')
            console.log(filtered)
            return {
                ...state,
                filter: filtered
        }
    }

    case  ORDER_NAME_ASC:{
        let asc = compare(state.allPokemons, 'name')
        return {
            ...state,
            allPokemons: asc
        }
    }

    case  ORDER_NAME_DESC:{
        let des = compare(state.allPokemons, 'name').reverse();
        return {
            ...state,
            allPokemons: des
        }
    }
    
    case ORDER_STRENGTH_ASC: {
        let asc = compare(state.allPokemons, 'name')
        return {
            ...state,
            allPokemons: asc
        }
    }
    case ORDER_STRENGTH_DESC: {
        let asc = compare(state.allPokemons, 'name').reverse()
        return {
            ...state,
            allPokemons: asc
        }
    }

    case  GET_ALL_POKEMONS_BY_DB: {
        const clonePoke = [...state.allPokemons]
        let filterDb = clonePoke.filter(filter => /[a-zA-Z]/.test(filter.id))
        return {
            ...state,
            filter: filterDb
        }

    }

    case GET_ALL_POKEMONS_BY_API: {
        const clonePoke = [...state.allPokemons]
        let filterApi = clonePoke.filter(filter => !(/[a-zA-Z]/.test(filter.id)))
        return {
            ...state,
            filter: filterApi
        }
    }
            
            
    
        default: return state;
            
    };

};

//allType.filter(el => (el.types[1]) ? el.types[1].name  === action.payload : el.types[0].name === action.payload)