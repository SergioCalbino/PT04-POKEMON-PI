import React from "react";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Styles from  "../PokeCard/PokeCard.module.css";
import imagen from '../img/descarga.jpg'

function PokeCard({id, name, img, types}) {
  //let poke = props.props;

  const dispatch = useDispatch();

  return (
   <>
   <div className={Styles.container}>
    {id == undefined ? <>

    <h1> there is no pokemon</h1> <img src={imagen}/>  
    </>
    : <>
      <Link  to={`/pokemon/${id}`}>
        <h1 key={id} className={Styles.name}>  {name}</h1>
      </Link>

    

      <div className={Styles.card}>
      {
     // img === '' ? <img src= {'https://i.pinimg.com/236x/bb/65/ac/bb65acb8eced7c4a1fbce90916211e80--sticker-vinyl-car-decals.jpg'} alt={"Not found"}/> : 
        <img className={Styles.img} src={img} alt="" />
        }

     

        <div  className={Styles.types}>
          <p>Types:</p>
          {
            types?.map((t) => {
            return <p key={t.id}>{t.name}</p>;
          })}
        </div>
      </div>
    </>}
    </div>
    </>
  );
}

export default PokeCard;
