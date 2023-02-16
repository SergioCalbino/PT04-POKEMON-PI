import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPokemons,
  deleteState,
  getTypes,
} from "../../redux/actions/actions";
import PokeCard from "../PokeCard/PokeCard";
import Pagination from "../Pagination/Pagination";
import { Link } from "react-router-dom";
import Styles from "../Home/Home.module.css";
import NavBar from "../Nav/Nav";

function Home() {
  const dispatch = useDispatch();
  const pokemonStore = useSelector((state) => state);
  const pokePerPage = 12;

  let [currentPage, setCurrentPage] = useState(1);
  const indexLastPage = currentPage * pokePerPage;
  const indexFirstPage = indexLastPage - pokePerPage;
  const currentPokes = pokemonStore.filter
    ? pokemonStore?.filter.slice(indexFirstPage, indexLastPage)
    : pokemonStore?.allPokemons.slice(indexFirstPage, indexLastPage);
    const paginate = (pageNumber) => setCurrentPage(pageNumber); //Indica en que pagina me encuentro

  useEffect(() => {
    dispatch(getAllPokemons());
  }, [dispatch]);

  const renderPokemons = () => {
    return (
      <div className={Styles.pokemon_card_container}>
        {currentPokes.map((po) => (
          <PokeCard
            key={po.name}
            id={po.id}
            name={po.name}
            img={po.img}
            types={po.types}
          />
        ))}
      </div>
    );
  }

  const renderOrder = {
    allPokemons: !pokemonStore.allPokemons ? (
      <h1>Cargando</h1>
    ) : (
      renderPokemons()
    ),
    filtered: !pokemonStore.filter ? (
      <h1>No se encontraron resultados</h1>
    ) : (
      renderPokemons()
    ),
  };

  const buttonBack = () => {
    dispatch(deleteState());
    dispatch(getAllPokemons());
    dispatch(getTypes());
  };

  return (
    <>
    
      <NavBar />
     
      <>
       
         
          
          
            {!pokemonStore.filter
              ? renderOrder.allPokemons
              : renderOrder.filtered}
         
          
        
        <>
          <Pagination
            pokePerPage={pokePerPage}
            totalPokemons={pokemonStore.allPokemons.length}
            paginate={paginate}
          />
        </>
      </>
  
    </>
  );
}

export default Home;
