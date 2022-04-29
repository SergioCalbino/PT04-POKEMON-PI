import React from "react";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import "../PokeCard/PokeCard.css";

function PokeCard(props) {
  let poke = props.props;

  const dispatch = useDispatch();

  return (
    <div className="container">
      <Link className="name" to={`/pokemon/${poke.id}`}>
        <h1 className="name">{poke.name}</h1>
      </Link>

      <div className="card">
      {
        poke.img === '' ? <img src= 'https://i.pinimg.com/236x/bb/65/ac/bb65acb8eced7c4a1fbce90916211e80--sticker-vinyl-car-decals.jpg' alt="Not found"/> : 
        <img className="img" src={poke.img} alt="" />
        }

     

        <div  className= "types">
          <p>Types:</p>
          {
            poke.types?.map((t) => {
            return <p key={t.id}>{t.name}</p>;
          })}
        </div>
      </div>
    </div>
  );
}

export default PokeCard;
