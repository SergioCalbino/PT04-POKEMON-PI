import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {ordeByStrength, getTypes, filterByType, ordeByName} from '../../redux/actions/actions'
import {getPokemonsByname} from '../../redux/actions/actions.js'


function Nav() {
    const [poke, setPoke] = useState('')
    const types = useSelector(state => state.types)
    const dispatch = useDispatch()
    const [currentPage, setCurrentPage] = useState(1)


    useEffect(() => {
        dispatch(getTypes())
    },[dispatch])

    function hanlderFilterByType(e) { //Filtro los tipos de pokemon
         e.preventDefault()
        dispatch(filterByType(e.target.value))
        setCurrentPage(1)
    }

    function handlerName(e) { // Filtro por orden alfabetico
        e.preventDefault()
        dispatch(ordeByName(e.target.value))
       
        setCurrentPage()
    }

    function handlerStrength(e) { // Filtro los pokemons por Fuerza
        e.preventDefault()
        dispatch(ordeByStrength(e.target.value))

    }

     // 
    //const namePokemon = useSelector(state => state.allpokemon)

    function handleInputChange(e) {
        setPoke(e.target.value)


    }

    function handleSubmit(e) { // Para realizar la busqueda por nombre
        e.preventDefault()
        dispatch(getPokemonsByname(poke))
        setPoke('')

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
        <option value="none">Sin filtro</option>
		<option value='asc'>Ascendente</option>
		<option value='desc'>Descendente</option>
		</select>	
        </div>

        <div>
        <select onChange={handlerStrength}>
            <option value='none'>Sin filtro</option>
            <option value='more'>More strength</option>
            <option value='less'>Less strength</option>
        </select>
        </div>

        <div>
            <input type="text"
                   placeholder="Pokemon..."
                   value={poke}
                   onChange={(e)=>handleInputChange(e)}
            />
            
            <button className="boton"  onClick={(e)=>handleSubmit(e)}>Buscar</button>
        </div>



      
            
 </div>
    )}
    
    








 

export default Nav