import React from "react";
import { Link } from "react-router-dom";
import Styles from "../PokeCard/PokeCard.module.css";
import imagen from "../img/random.gif";
import noPoke from '../img/descarga.jpg'

function PokeCard({ id, name, img, types }) {
  return (
    <>
      <div className={Styles.container}>
        {id === undefined ? (
          <>
            <h1> there is no pokemons</h1> <img src={noPoke} />
          </>
        ) : (
          <>
             
             
            <Link to={`/pokemon/${id}`}>
              <h1 key={id} className={Styles.name}>
                {" "}
                {name}
              </h1>
            </Link>

            <div className={Styles.card}>
              {<img className={Styles.img} src={img ? img : imagen} alt="" />}


              <div className={Styles.types}>
                <p>Types:</p>
                {types?.map((t) => {
                  return <p key={t.id}>{t.name}</p>;
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default PokeCard;
