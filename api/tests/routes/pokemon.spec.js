/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon, conn } = require('../../src/db.js');

const agent = session(app);
const pokemon = {
  name: 'Pikachu',
  life: 56, 
  strength: 23, 
  defense: 65, 
  speed: 23, 
  height: 54, 
  weight: 63, 
   
  img: "image"
};

describe('Pokemon routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Pokemon.sync({ force: true })
    .then(async () => await Pokemon.create(pokemon)));
  describe('GET /pokemons', () => {
    it('should get 200', ()  =>
      agent.get('/pokemons').expect(200),
      
    );
  });
});

