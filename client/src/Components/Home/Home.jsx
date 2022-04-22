import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getAllPokemons, getTypes, filterByType, handlerStrength} from '../../redux/actions/actions'
import Nav from '../Nav/Nav';
import PokeCard from '../PokeCard/PokeCard'
import Pagination from '../Pagination/Pagination';
import CretePokemon from '../CreatePokemon/CreatePokemon';
import { Link } from "react-router-dom";




function Home() {
  const dispatch = useDispatch();
  const pokemonStore = useSelector((initialState) => initialState);

  const [postsPerPage] = useState(12);

  let [currentPage, setCurrentPage] = useState(1);
  const indexLastPage = currentPage * postsPerPage;
  const indexFirstPage = indexLastPage - postsPerPage;
  const currentPokes = pokemonStore.filter ? pokemonStore?.filter.slice(indexFirstPage,indexLastPage) : pokemonStore?.allPokemons.slice(indexFirstPage,indexLastPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
    
    
    useEffect(() => {
        dispatch(getAllPokemons())
    },[dispatch]);
    console.log(pokemonStore.allPokemons)

   
   
    const renderPokemons = () => {
        return currentPokes.map((po) => (
            <div >
              <PokeCard key={po.name} props={po} />
            </div>
            
          ))
        
    }
    
    return (

        <>
        <Nav/>
        <div>
        {
            <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)'}} >
              {pokemonStore ? renderPokemons()
              : <h1>Cargando</h1>
              }
        </div>

        
        }
        <Pagination 
              postsPerPage={postsPerPage}
              totalPokemons={pokemonStore.allPokemons.length}
              paginate={paginate}
            />
        </div>

        <Link to={'/pokemons'}>
       <button>Create Pokemon</button> 
        </Link>

        <Link to={'/home'}>
        <button>Back</button>
        </Link>
        </>
      )
    
}

export default Home

