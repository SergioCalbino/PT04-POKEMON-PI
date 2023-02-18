import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Banner from 'react-js-banner';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import {
  ordeByStrengthAsc,
  getTypes,
  filterByType,
  orderNameAsc,
  orderNameDesc,
  getAllPokemons,
  ordeByStrengthDesc,
  getPokemonsByDb,
  getPokemonsByApi,
  deleteState,
  getPokemonByname,
} from "../../redux/actions/actions";

import Styles from "../Nav/Nav.module.css";

function NavBar() {
  const [search, setSearch] = useState("");
  const types = useSelector((state) => state.types);
  const pokemons = useSelector((state) => state);
  const dispatch = useDispatch();


  function searchPokemon(e) {
    // Para realizar la busqueda por nombre
    e.preventDefault();
   
    if (!/[a-zA-Z]/.test(search)) {
      //Constatamos que lo que se ingrese sea un nombre
      alert("Invalid Character");
      setSearch("");
    } else {
      dispatch(getPokemonByname(search));
      setSearch("");
    }
  }

  function handleInputChange(e) {
    setSearch(e.target.value);
  }

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  function hanlderFilterByType(e) {
    //Filtro los tipos de pokemon
    e.preventDefault();
    dispatch(filterByType(e.target.value));
  }

  function handlerName(e) {
    // Filtro por orden alfabetico
    if (e.target.value === "asc") {
      return dispatch(orderNameAsc());
    }

    if (e.target.value === "desc") {
      return dispatch(orderNameDesc());
    }

    if (e.target.value === "") {
      return dispatch(deleteState());
    }

    return;
  }

  function handlerStrength(e) {
    // Filtro los pokemons por Fuerza
    if (e.target.value === "asc") {
      return dispatch(ordeByStrengthAsc());
    }
    if (e.target.value === "desc") {
      return dispatch(ordeByStrengthDesc());
    }
    if (e.target.value === "") {
      return dispatch(deleteState());
    }
    return;
  }

  function handlerOriginPokemons(e) {
    // Filtro los pokemons por origen
    if (e.target.value === "Data Base") {
      dispatch(getPokemonsByDb());
    }
    if (e.target.value === "Api") {
      dispatch(getPokemonsByApi());
    }
    if (e.target.value === "") {
      delete pokemons.filter;
      dispatch(getAllPokemons());
    }
  }

  function clear() {
    return dispatch(deleteState());
  }

  return (
    <>
     <Navbar bg="success" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/home">Poke Api</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            {/* <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2">Link</Nav.Link> */}
            <Form.Select  className="mx-2" aria-label="Default select example" onChange={hanlderFilterByType} >
            {types.map((ty, i) => (
                <option key={i} name={ty.name}>
                  {" "}
                  {ty.name}
                </option>
              ))}
            </Form.Select>
            
            <Form.Select className="mx-2" aria-label="Default select example" onChange={handlerName}>
            <option value="">Order By Name</option>
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
            </Form.Select>
            
            <Form.Select  className="mx-2" aria-label="Default select example" onChange={handlerStrength}>
            <option value="">order By Strength</option>
            <option value="asc">More strength</option>
            <option value="desc">Less strength</option>
            </Form.Select>
            
            <Form.Select className="mx-2" aria-label="Default select example" onChange={handlerOriginPokemons}>
            <option value=""> Select origin from Pokemons</option>
            <option value="Data Base"> Pokemons from Data Base</option>
            <option value="Api"> Pokemons from Api</option>
            </Form.Select>
          
             <a href="/pokemons" className={Styles.btn} >Create Pokemon</a>
            
         
            
          </Nav>
          <Form className="d-flex" onSubmit={searchPokemon}>
          <Form.Control
          
             className="me-2"
            aria-label="Default select example"
            onChange={handleInputChange}
            value={search}
            placeholder="Search Name"
          

          />
          <button className={Styles.btn} >
            Search
          </button>

        </Form>
          
          {/* <Form className="d-flex">
            <Form.Control 
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={handleInputChange}
            value={search}
           
            />
            
          </Form> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
          

          
          
  
          
      
    
    </>
  );
}

export default NavBar;
