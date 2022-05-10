import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPokemons,
  deleteState,
  getTypes,
  
} from "../../redux/actions/actions";
import Nav from "../Nav/Nav";
import PokeCard from "../PokeCard/PokeCard";
import Pagination from "../Pagination/Pagination";
import { Link } from "react-router-dom";
import Styles from "../Home/Home.module.css";
import rando from '../img/random.gif'

function Home() {
  const dispatch = useDispatch();
  const pokemonStore = useSelector((initialState) => initialState);
  const filter = useSelector((initialState) => initialState.filter)
  const pokePerPage = 12;

  let [currentPage, setCurrentPage] = useState(1);
  const indexLastPage = currentPage * pokePerPage;
  const indexFirstPage = indexLastPage - pokePerPage;
  const currentPokes = pokemonStore.filter
    ? pokemonStore?.filter.slice(indexFirstPage, indexLastPage)
    : pokemonStore?.allPokemons.slice(indexFirstPage, indexLastPage);
  //Este currentsPokes lo utilizo para veriificar sobre los pokemons de la api y la DB con el paginado. En caso contrario, utilizo para todos juntos.
  //Lugo en currentPokes hago el mapeo, ya sea con ordenamiento de api y db, o de todos
  const paginate = (pageNumber) => setCurrentPage(pageNumber); //Indica en que pagina me encuentro

  useEffect(() => {
    dispatch(getAllPokemons());
  }, [dispatch, filter]);
 // console.log(pokemonStore.allPokemons);

  const renderPokemons = () => {
    return currentPokes.map((po) => (
      <div>
        <PokeCard key={po.name} 
                  id={po.id} 
                  name={po.name} 
                  img={po.img} 
                  types={po.types}  />
      </div>
    ));
  };

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
    dispatch(deleteState())
    dispatch(getAllPokemons())
    dispatch(getTypes())

  }

  return (
    <>
      <Nav />
      <>
        <div className={Styles.buttonContainer}>
          <button className={Styles.button}> <Link to={"/pokemons"}>Go To Create Pokemon</Link> </button>
       
          <button onClick={buttonBack} className={Styles.buttonBack}>Back</button>
          </div>
        {
          
          <div className={Styles.pokemons}>
       
          
            {!pokemonStore.filter
              ? renderOrder.allPokemons
              : renderOrder.filtered}
          </div>
          
        }
        < >
        
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

