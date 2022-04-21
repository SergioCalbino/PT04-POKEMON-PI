import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {ordeByStrength, getTypes, filterByType, orderNameAsc, orderNameDesc, getAllPokemons} from '../../redux/actions/actions'
import {getPokemonsByname} from '../../redux/actions/actions.js'


function Nav() {
    const [search, setSearch] = useState("")
    const types = useSelector(state => state.types)
    const dispatch = useDispatch()
    //const [currentPage, setCurrentPage] = useState(1)

    function searchPokemon(e) { // Para realizar la busqueda por nombre
        e.preventDefault()
        dispatch(getPokemonsByname(search))
        setSearch('')

    }

      function handleInputChange(e) {
        setSearch(e.target.value)


    }


    useEffect(() => {
        dispatch(getTypes())
    },[dispatch])

    function hanlderFilterByType(e) { //Filtro los tipos de pokemon
         e.preventDefault()
        dispatch(filterByType(e.target.value))
        
    }

    function handlerName(e) { // Filtro por orden alfabetico
        if(e.target.value === 'asc'){
        dispatch(orderNameAsc())
        }

        if (e.target.value === 'desc') {
            dispatch(orderNameDesc())
            
        }
        if (e.target.value === '') {
            dispatch(getAllPokemons())
            
        }

        return
    }

    function handlerStrength(e) { // Filtro los pokemons por Fuerza
        e.preventDefault()
        dispatch(ordeByStrength(e.target.value))

    }

     // 
    //const namePokemon = useSelector(state => state.allpokemon)

  

   


  

    return (
    <div>
        <div>
        <select onChange={hanlderFilterByType}>
            {
                types.map((ty,i) => (
                <option key={i} name={ty.name}> {ty.name}</option>
            ))}
        </select>
        </div>
        
        <div>
        <select onChange={handlerName}> 
            <option value=''>Ordena por Nombre</option>
		    <option value='asc'>Ascendente</option>
		    <option value='desc'>Descendente</option>
		</select>	
        </div>

        <div>
        <select onChange={handlerStrength}>
            <option value='none'>Ordena por Fuerza</option>
            <option value='more'>More strength</option>
            <option value='less'>Less strength</option>
        </select>
        </div>

            
            <input onChange={handleInputChange} value={search} placeholder="Buscar por nombre"/> 
            <button onClick={searchPokemon}>Buscar</button>
            
            



      
            
 </div>
    )}
    
    








 

export default Nav