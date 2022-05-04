
import React from 'react';
import Styles from '../Pagination/Pagination.module.css'

const Pagination = ({ pokePerPage, totalPokemons, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPokemons / pokePerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className={Styles.pagination}>
      <ul >
        {pageNumbers.map(number => (
          <li key={number} >
          <button className={Styles.paginationButton} onClick={() => paginate(number)}>{number}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;

