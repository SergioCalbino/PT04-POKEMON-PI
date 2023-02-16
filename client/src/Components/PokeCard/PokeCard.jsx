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
     
     {/* <Card style={{ width: '400px', height: '400px', display: 'inline-block', flexDirection: 'column', justifyContent: 'space-arround', marginTop: '25px', marginLeft: '120px', alignItems: 'center' }}>
          <Card.Title>{name}</Card.Title>
        <Card.Img variant="top"  style={{ width: '300px', height: '400px'}} src={img} />
        <Card.Body  >
          <span> Type:</span>{types?.map((t) => {
                  return   <span  key={t.id}>  {t.name} - </span>;
                })}
          <Card.Text>
          </Card.Text>
          <Button variant="primary"> <Link to={`/pokemon/${id}`} ></Link> </Button>
        </Card.Body>
      </Card> */}
     
      <div className={Styles.pokemon_card}>
      <img src={img} alt={name} />
      <h2>{name}</h2>
      <p>{types?.map((t) => {
                  return   <span  key={t.id}>  {t.name} - </span>;
                })}</p>
    </div>
    
    </>
  );
}

export default PokeCard;
