import React from "react";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";


function PokeCard(props) {
  let poke = props.props;
  
  const dispatch = useDispatch();

  


  return (
    <div >
      
      <Link to={`/pokemon/${poke.id}`}>
        <h1>{poke.name} {poke.id}</h1>
      </Link>
     
     <img  src={poke.img} alt="" />
      <div>
      
        <h2>Type pokemon:</h2>
           <div>
           {/* {poke.types?.map(t => t.types)} */}
          {poke.types?.map((t) => {
            return <p key={t.id}>
            {(t.name)}</p>;
          })}
      </div>
      </div>
  
    </div>
  );
}

export default PokeCard;