import React from "react";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";


function PokeCard(props) {
  let poke = props.props;
  
  const dispatch = useDispatch();

  


  return (
    <div >
      
      <Link to={`/pokemon/${poke.id}`}>
        <h1>{poke.name}</h1>
      </Link>
     
     <img  src={poke.sprites} alt="" />
      <div>
        <h2>Tipo de pokemon:</h2>
           <div>
          {poke.Types?.map((t) => {
            return <p key={t.id}>{(t.name)}</p>;
          })}
      </div>
      </div>
  
    </div>
  );
}

export default PokeCard;