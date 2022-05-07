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
    <div>
      {detail.pokemons ? (
        <div >
          <div className={Styles.infoPokemon}>
          <label> Id: <b>{detail.pokemons.id} </b> </label>
            <label>
              {" "}
              Life:<b> {detail.pokemons.life}</b>{" "}
            </label>
            <label>
              {" "}
              strength:<b>{detail.pokemons.strength}</b>
            </label>
            <label>
              Defense:<b>{detail.pokemons.defense} </b>
            </label>
            <label>Speed: {detail.pokemons.speed} </label>
            <label>Height: {detail.pokemons.height}</label>
            <div>Weight: {detail.pokemons.weight}</div>
            <div>
              <label>types:</label>
              {detail.pokemons.types?.map((ty) => {
                return <p>{ty.name}</p>;
              })}
            </div>
              
              <div>
            <div className={Styles.name} >
              <h4>{detail.pokemons.name}</h4>
              
              <img src={detail.pokemons.img} alt={sombra}></img>
              </div>
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
