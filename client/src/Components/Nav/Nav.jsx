import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {ordeByStrengthAsc, getTypes, filterByType, orderNameAsc, orderNameDesc, getAllPokemons, ordeByStrengthDesc, getPokemonsByDb, getPokemonsByApi} from '../../redux/actions/actions'
import {getPokemonsByname} from '../../redux/actions/actions.js'


function Nav() {
    const [search, setSearch] = useState("")
    const types = useSelector(state => state.types)
    const pokemons = useSelector(state => state)
    const dispatch = useDispatch()
    //const [currentPage, setCurrentPage] = useState(1)

    function searchPokemon(e) { // Para realizar la busqueda por nombre
        e.preventDefault()
       // dispatch(getPokemonsByname(search))
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
       if(e.target.value === 'asc') {
        dispatch(ordeByStrengthAsc(e.target.value))
       }
       if(e.target.value === 'desc') {
           dispatch(ordeByStrengthDesc(e.target.value))
       }
       if(e.target.value === '') {
           dispatch(getAllPokemons())

       }

    }

    function handlerOriginPokemons(e) {
        if(e.target.value === 'Data Base') {
            dispatch(getPokemonsByDb(e.target.value))
        }
        if(e.target.value === 'Api') {
            dispatch(getPokemonsByApi(e.target.value))
        }
        if(e.target.value === '') {
            delete pokemons.filter
            dispatch(getAllPokemons())

        }
    }
    
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
            <option value=''>Ordena por Fuerza</option>
            <option value='asc'>More strength</option>
            <option value='desc'>Less strength</option>
        </select>
        </div>

        <div>
            <select onChange={handlerOriginPokemons}>
                <option value=''> Select origin from Pokemons</option>
                <option value='Data Base'> Pokemons from Data Base</option>
                <option value='Api'> Pokemons from Api</option>
            </select>
        </div>

            
            <input onChange={handleInputChange} value={search} placeholder="Buscar por nombre"/> 
            <button onClick={searchPokemon}>Buscar</button>
            
            



      
            
 </div>
    )}
    
    








 

export default Nav