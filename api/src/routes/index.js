const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
//const Pokemon = require('../models/Pokemon');
const {Pokemon, Type} = require('../db')


const url = 'https://pokeapi.co/api/v2/pokemon';
const urlId = `https://pokeapi.co/api/v2/pokemon/`;
const urlName = `https://pokeapi.co/api/v2/pokemon/`;
const urlType = `https://pokeapi.co/api/v2/type`

const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/', (req, res) => {
    res.send('<h1>Bienvenidos</h1>')
})

//Traemos por params con ID el pokemon
router.get('/pokemons/:id', async (req, res) => {
    let {id} = req.params;
    let urlApi = urlId+id;
    let allpokemons = {}
        
        try {
            allpokemons = await axios.get(urlApi)
            res.json(allpokemons.data)
        } catch (error) {
            res.status(404).send(error)
            }
        })
//Hacemos el request de Name y todo los Pokemons
router.get('/pokemons', async (req, res) => {
    let {name} = req.query
    let urlApi = urlName
    let allpokemons = {}

    if(name) {
        urlApi = urlName+name
    }
    try {
        allpokemons = await axios.get(urlApi)
       // let data = allpokemons.data
       // let dataSort = compare(data)
        res.json(allpokemons.data)
    } catch (error) {
        res.status(404).send({error: "El nombre del pokemon ingresado no existe"})
    }
})

// Vamos a crear el pokeon con los datos obligatorios
router.post('/pokemons', async (req, res) => {
    let {name, life, strength, defense, speed, height, Weight} = req.body;
    if(!name) return res.status(404).send("El nombre es requerido")

       
    try {
        const newPokemon = await Pokemon.create({name, life, strength, defense, speed, height, Weight})
        return res.status(201).json(newPokemon)
        } catch (error) {
            res.status(404).send(error)
        
    }

})

router.get('/types', async (req, res) => {
    let allpokemons = {}
    let urlApi = urlType;
    try {
        allpokemons = await axios.get(urlApi)
        res.json(allpokemons.data)
    } catch (error) {
        
    }
})







module.exports = router;
