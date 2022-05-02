import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPokemons,
  deleteState,
  getTypes,
  filterByType,
  handlerStrength,
} from "../../redux/actions/actions";
import Nav from "../Nav/Nav";
import PokeCard from "../PokeCard/PokeCard";
import Pagination from "../Pagination/Pagination";
import CretePokemon from "../CreatePokemon/CreatePokemon";
import { Link } from "react-router-dom";
import Styles from "../Home/Home.module.css";

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
  console.log(pokemonStore.allPokemons);

  const renderPokemons = () => {
    return currentPokes.map((po) => (
      <div>
        <PokeCard key={po.name} props={po} />
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
      <div>
        <Link to={"/pokemons"}>
          <button className={Styles.button}>Create Pokemon</button>
        </Link>
       
          <button onClick={buttonBack} className={Styles.buttonBack}>Back</button>
        {
          <div className={Styles.pokemons}>
            {/* {pokemonStore ? renderPokemons()
              : <h1>Cargando</h1>
              } */}
            {!pokemonStore.filter
              ? renderOrder.allPokemons
              : renderOrder.filtered}
          </div>
        }
        <div >
        <Pagination className={Styles.pagination}
          pokePerPage={pokePerPage}
          totalPokemons={pokemonStore.allPokemons.length}
          paginate={paginate}
        />
        </div>
      </div>
    </>
  );
}

export default Home;

//style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)'}}
