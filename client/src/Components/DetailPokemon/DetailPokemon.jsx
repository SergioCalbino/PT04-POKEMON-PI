import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPokemonsById } from "../../redux/actions/actions.js";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import sombra from "../img/all.jpg";
import Styles from "../DetailPokemon/DetailPokemon.module.css";
import { deleteState } from "../../redux/actions/actions";

function DetailPokemon() {
  const detail = useSelector((state) => state);
  const { id } = useParams();
  const dispatch = useDispatch();
  console.log(detail.pokemons.types);

  useEffect(() => dispatch(getPokemonsById(id)), [dispatch]);

  function back() {
    dispatch(deleteState());
  }

  //let pokeFilt = detail.filter((poke) => poke.id === pokeId)

  return (
    <div >
      
      
      {detail.pokemons ? (
        <div >
          
        <div className={Styles.card}>{detail.pokemons.name}</div>
          
          


          <div className={Styles.card}>
            <h2> Id: <b>{detail.pokemons.id} </b> </h2> 
            <h4> Life:<b> {detail.pokemons.life}</b> </h4>
            <h4> strength:<b>{detail.pokemons.strength}</b></h4>
            <h4>Defense:<b>{detail.pokemons.defense} </b></h4>

              <div>
                <label>Speed:</label>
                {detail.pokemons.speed}
              </div>

              <div>
                <label>Height:</label>
                {detail.pokemons.height}
              </div>

              <div>
                <label>Weight:</label>
                {detail.pokemons.weight}
              </div>
              
              <div>
                <label>types:</label>
                {detail.pokemons.types?.map((ty) => {
                  return ( <p>{ty.name}</p>
                  )
                })}
              </div>
          <div>
            <img
              className={Styles.img}
              src={detail.pokemons.img}
              alt={sombra}
            ></img>
          </div>
              
            
          </div>
        </div>
      ) : (
        <h1>Cargando</h1>
      )}

      <Link to={"/home"}>
        <button className={Styles.back} onClick={back}>
          {" "}
          Back to home
        </button>
      </Link>
    </div>
  );
}

export default DetailPokemon;
