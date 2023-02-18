import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import Styles from "../PokeCard/PokeCard.module.css";
import imagen from "../img/random.gif";
import noPoke from '../img/descarga.jpg'

function PokeCard({ id, name, img, types }) {
  return (
    <>
     
     
     
      <div className={Styles.pokemon_card}>
      <img src={img} alt={name} />
     <Link to={`/pokemon/${id}`} >  <h2>{name}</h2> </Link>
      <p>{types?.map((t) => {
                  return   <span  key={t.id}>  {t.name} - </span>;
                })}</p>
    </div>
    
    </>
  );
}

export default PokeCard;
