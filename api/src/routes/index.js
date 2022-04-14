const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
//const Pokemon = require('../models/Pokemon');
const {Pokemon, Type} = require('../db')
const {reqApi} = require('../ReqApi/ReqApi')


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


// Hacemos el request a types y luego lo mandamos a la
router.get('/types', async (req, res) => {
    try {
        const allpokemons = await axios.get(urlType)
        let typePoke = await allpokemons.data.results.map((ty) =>{
            return {
                name: ty.name,
                url: ty.url
            }
        })
        await Type.bulkCreate(typePoke)
        res.json(typePoke)
    } catch (error) {
        
    }
})

router.post('/pokemons', async (req, res) => {
    let {name, life, strength, defense, speed, height, weight, types} = req.body;
    if(!name) return res.status(404).send("El nombre es requerido")

       
    try {
        const newPokemon = await Pokemon.create({name, life, strength, defense, speed, height, weight})
        let findType = await Type.findAll({
            where: {
                id: types
            }
        })
        await newPokemon.addTypes(findType);
        return res.status(201).json(newPokemon)
        } catch (error) {
            console.log(error)
            res.status(404).send(error)
        
    }

})


//Traemos por params con ID el pokemon
router.get('/pokemons/:id', async (req, res) => {
    let {id} = req.params;
    let urlApi = urlId+id;
    let allpokemons = []
    ///^[0-9]+$/.test(id)
    
    if(/[a-zA-Z]/.test(id)) {
        try {
            const pokeId = await Pokemon.findOne({
                where: {id: id},
                include: {
                    model: Type,
                    attributes: ["name","url"],
                    through: {attributes:[]}
                }
            })
            if(pokeId !==null){ 
           return  res.json(pokeId)
            }
        } catch (error) {
            return res.status(404).send({error: "El id enviado no existe"})
            
        }
    }

    
        
        try {
           let pokeApi = await axios.get(urlApi) //Me traigo todos los Pokemons de la Api por Id
           pokeApi = pokeApi.data
            let onePoke = {
                id: pokeApi.id,
                image: pokeApi.sprites.other.dream_world.front_default,
                name: pokeApi.name,
                types: pokeApi.types.map(type => ({name: type.type.name, url: type.type.url})),
                life: pokeApi.stats[0].base_stat,
                strength: pokeApi.stats[1].base_stat,
                defense: pokeApi.stats[2].base_stat,
                speed: pokeApi.stats[3].base_stat,
                height: pokeApi.height,
                weigth: pokeApi.weight,
                
            }
            
            res.json(onePoke);
        
        } catch (error) {
            res.send({error: "El id enviado no existe"})
        }
    })

    // name: poke.data.name,
    // life: poke.data.stats[0].base_stat,
    // strength:  poke.data.stats[1].base_stat,
    // defense: poke.data.stats[2].base_stat,
    // speed: poke.data.stats[5].base_stat,
    // height: poke.data.height,
    // weight: poke.data.weight,

//Hacemos el request de Name y todo los Pokemons
router.get('/pokemons', async (req, res) => {
    let {name} = req.query
    let urlApi = urlName
    let allpokemons = {}
    let onlyPoke = {};
    
    if(name) {
        
        urlApi = urlName+name.toLocaleLowerCase().trim();

        try {
            const pok = await axios(urlApi)
            console.log(pok.data)
            onlyPoke = pok.data
            return res.json(onlyPoke);
        } catch (error) {
            
        };
    }
    
    try {
        // Aca hago el llamado a reqApi que tiene todos los pokemos. Ver carpeta ReqApi
        const pokeDev = await reqApi()
        res.json(await Promise.all(pokeDev))
       // let data = allpokemons.data
       // let dataSort = compare(data)
        
    } catch (error) {
        res.status(404).send({error: "El nombre del pokemon ingresado no existe"})
    }
})

// Vamos a crear el pokeon con los datos obligatorios
router.post('/pokemons', async (req, res) => {
    let {name, life, strength, defense, speed, height, weight, types} = req.body;
    if(!name) return res.status(404).send("El nombre es requerido")

       
    try {
        const newPokemon = await Pokemon.create({name, life, strength, defense, speed, height, weight})
        await newPokemon.addType(types);
        return res.status(201).json(newPokemon)
        } catch (error) {
            console.log(error)
            res.status(404).send(error)
        
    }

})








module.exports = router;
