import React from "react";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Styles from  "../PokeCard/PokeCard.module.css";
import imagen from '../img/descarga.jpg'

function PokeCard(props) {
  let poke = props.props;

  const dispatch = useDispatch();

  return (
    <div className={Styles.container}>
    {poke.id == undefined ? <>

    <h1>No existe el pokemon</h1> <img src={imagen}/>  
    </>
    : <>
      <Link className={Styles.name} to={`/pokemon/${poke.id}`}>
        <h1 className={Styles.name}>{poke.name}</h1>
      </Link>

    

      <div className={Styles.card}>
      {
        poke.img === '' ? <img src= 'https://i.pinimg.com/236x/bb/65/ac/bb65acb8eced7c4a1fbce90916211e80--sticker-vinyl-car-decals.jpg' alt="Not found"/> : 
        <img className={Styles.img} src={poke.img} alt="" />
        }

     

        <div  className={Styles.types}>
          <p>Types:</p>
          {
            poke.types?.map((t) => {
            return <p key={t.id}>{t.name}</p>;
          })}
        </div>
      </div>
    </>}
    </div>
  );
}

export default PokeCard;
