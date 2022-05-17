import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPokemonsById } from "../../redux/actions/actions.js";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Styles from "../DetailPokemon/DetailPokemon.module.css";
import { deleteState } from "../../redux/actions/actions";
import imagen from '../img/bb65acb8eced7c4a1fbce90916211e80--sticker-vinyl-car-decals.jpg'

function DetailPokemon() {
  const detail = useSelector((state) => state);
  const { id } = useParams();
  const dispatch = useDispatch();
  

  useEffect(() => dispatch(getPokemonsById(id)), [dispatch]);

  function back() {
    dispatch(deleteState());
  }



  return (
    // <div>
    //   {detail.pokemons ? (
    //     <div >
    //       <div className={Styles.infoPokemon}>
    //       <label> Id: <b>{detail.pokemons.id} </b> </label>
    //         <label>
    //           {" "}
    //           Life:<b> {detail.pokemons.life}</b>{" "}
    //         </label>
    //         <label>
    //           {" "}
    //           strength:<b>{detail.pokemons.strength}</b>
    //         </label>
    //         <label>
    //           Defense:<b>{detail.pokemons.defense} </b>
    //         </label>
    //         <label>Speed: {detail.pokemons.speed} </label>
    //         <label>Height: {detail.pokemons.height}</label>
    //         <div>Weight: {detail.pokemons.weight}</div>
    //         <div>
    //           <label>types:</label>
    //           {detail.pokemons.types?.map((ty) => {
    //             return <p>{ty.name}</p>;
    //           })}
    //         </div>
              
    //           <div>
    //         <div className={Styles.name} >
    //           <h4>{detail.pokemons.name}</h4>
              
    //           <img className={Styles.img} src={detail.pokemons.img ? detail.pokemons.img : imagen}></img>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   ) : (
    //     <h1>Cargando</h1>
    //   )}

    //   <Link to={"/home"}>
    //     <button className={Styles.back} onClick={back}>
    //       {" "}
    //       Back to home
    //     </button>
    //   </Link>
    // </div>
    <>  
    <div className={Styles.all}>
    <div className="col-md-4">
      <img src={detail.pokemons.img ? detail.pokemons.img : imagen} className="img-fluid rounded-start" alt="..."/>
   
    </div>
        <div className={Styles.cont}>
        <h1><p className="text-danger">Detail Pokemon</p></h1>
        <h5 className="card-title"> Name : <span className="text-primary">{detail.pokemons.name}</span></h5>
        <h5 className="card-text">Id: <strong className="text-muted">{detail.pokemons.id}</strong></h5>
        

       
       


    
    <div className={Styles.detail}>
    <h1>Features</h1>
    <div className="card text-dark bg-warning mb-3" styleName="max-width: 600px;">
  <div className="row g-0">
    <div className="col-md-8">
      <div className="card-body">
        <h5 className="card-title"> Height: <span className="text-primary">{`${detail.pokemons.height} Inch`}</span></h5>
        <h5 className="card-title"> Weight: <span className="text-primary">{`${detail.pokemons.weight} kilos`}</span></h5>
        <h5 className="card-title"> Life: <span className="text-primary">{`${detail.pokemons.life} Pts`}</span></h5>
        <h5 className="card-title"> Speed: <span className="text-primary">{`${detail.pokemons.speed} m/s`}</span></h5>
        <h5 className="card-title"> Types: <span className="text-primary">{detail.pokemons.types?.map((t) => {
                  return <p key={t.id}>{t.name}</p>;
                })}</span></h5>
      
      </div>
    </div>
  </div>
</div>
</div>
</div>
 <Link to={"/home"}>
         <button className={Styles.back} onClick={back}>
           {" "}
           Back to home
        </button>
       </Link>
       </div>
    </>

  );
}

export default DetailPokemon;

