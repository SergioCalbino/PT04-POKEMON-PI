import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getAllPokemons, getTypes, filterByType, ordeByName} from '../../redux/actions/actions'
import SearchBar from '../SearchBar/SearchBar';

function Nav() {
    const types = useSelector(state => state.types)
    const dispatch = useDispatch()
    const [currentPage, setCurrentPage] = useState(1)


    useEffect(() => {
        dispatch(getTypes())
    },[dispatch])

    function hanlderFilterByType(e) { //Filtro los tipos de pokemon
        // e.preventDefault()
        dispatch(filterByType(e.target.value))
        setCurrentPage(1)
    }

    function handlerName(e) { // Filtro por orden alfabetico
        e.preventDefault()
        dispatch(ordeByName(e.target.value))
       
        setCurrentPage()
    }

  

    return (
    <div>

        <select onChange={hanlderFilterByType}>
            {
                types.map((ty,i) => (
                <option key={i} name={ty.name}> {ty.name}</option>
            ))}
        </select>
        
        <select onChange={e => handlerName(e)}>
        <option value="none">Sin filtro</option>
		<option value='asc'>Ascendente</option>
		<option value='desc'>Descendente</option>
		</select>	
 </div>
    )
                }
    
    








 

export default Nav