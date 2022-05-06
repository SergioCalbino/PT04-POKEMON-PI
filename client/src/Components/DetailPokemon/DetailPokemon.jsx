import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPokemonsById } from "../../redux/actions/actions.js";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import sombra from "../img/all.jpg";
import Styles from "../DetailPokemon/DetailPokemon.module.css";
import {deleteState} from "../../redux/actions/actions";

function DetailPokemon() {
  const detail = useSelector((state) => state);
  const { id } = useParams();
  const dispatch = useDispatch();
  console.log(detail.pokemons);

  useEffect(() => dispatch(getPokemonsById(id)), [dispatch]);

  function back() {
    dispatch(deleteState())
  }

  //let pokeFilt = detail.filter((poke) => poke.id === pokeId)

  return (
    <div className={Styles.container}>
    <div>
              </div>
      {detail.pokemons ? (
        
        <div className={Styles.det}>
          <div>
            <div className={Styles.name}>
            {detail.pokemons.name}
            </div>
          </div>

          <div>
            <img
              className={Styles.img}
              src={detail.pokemons.img}
              alt={sombra}
            ></img>
          </div>

          <div className={Styles.infoPokemon}>
            <div>
                <label> Id: </label>
                {detail.pokemons.id}
              

              <div>
                <label> Life: </label>
                {detail.pokemons.life}
              </div>

              <div>
                <label>strength:</label>
                {detail.pokemons.strength}
              </div>

              <div>
                <label>Defense:</label>
                {detail.pokemons.defense}
              </div>

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
            </div>
          </div>
        </div>
      ) : (
        <h1>Cargando</h1>
      )}

      <Link to={"/home"}>
        <button className={Styles.back} onClick={back} >  Back to home</button>
      </Link>
    </div>
  );
}

export default DetailPokemon;

