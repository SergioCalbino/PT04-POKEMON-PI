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


// Hacemos el request a types y luego lo utilizo para la creación del pokemon en el post
router.get('/types', async (req, res) => {

    try {
        const allTypeDb = await Type.findAll()
        if(allTypeDb.length > 1) res.json(allTypeDb) 
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
    let {name, life, strength, defense, speed, height, weight, type} = req.body;
    if(!name) return res.status(404).send("El nombre es requerido")

       
    try {
        const newPokemon = await Pokemon.create({name, life, strength, defense, speed, height, weight})
        await newPokemon.addTypes(type);
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
            if(pokeId !== null){ 
           return  res.json(pokeId)
            }
        } catch (error) {
            return res.status(404).send({error: "El id ingresado no existe"})
            
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
            res.send({error: "El id ingresado no existe"})
        }
    })


//Hacemos el request de Name y todo los Pokemons
router.get('/pokemons', async (req, res) => {
    let {name} = req.query
    let urlApi = urlName
    let allpokemons = []
   
    
    
    if(name) {

        try {
                //Si existe name, primero verifico si existe en la base de datos
                allpokemons = await Pokemon.findOne({
                    where: {name : name},
                    include: {
                        model: Type,
                        attributes: ["name","id"],
                        through: { attributes: [] },
                    }
                        
                    }
                )
                
              if(allpokemons.name) return res.json(allpokemons) 
                
        } catch (error) {
            return res.send({error: "el nombre ingresado no existe"})
           // console.log('error en DB')
           //No utilizo un send.error porque corta el flujo de la aplicaciónn
          
        }
        
        // Este es el supuesto del nombre, pero para el caso de la Api
        urlApi = urlName+name.toLocaleLowerCase().trim();

        try {
            const poke = await axios(urlApi)
            
            let onlyPoke = {
                id: poke.data.id,
                name: poke.data.name,
                life: poke.data.stats[0].base_stat,
                strength:  poke.data.stats[1].base_stat,
                defense: poke.data.stats[2].base_stat,
                speed: poke.data.stats[5].base_stat,
                height: poke.data.height,
                weight: poke.data.weight,
                img: poke.data.sprites.other.dream_world.front_default,
                types: poke.data.types.map(type => ({name: type.type.name, url: type.type.url}))
            }
        
          
            return res.json(onlyPoke);
        
        } catch (error) {
            res.status(404).send({error: "El nombre ingresado no existe"})
            
        };
    }

    // Si no me pasan nombre, entonces traigo todos los pokemons de la DB y la Api
    try {
        let allPokeDb = await Pokemon.findAll({
            include: {
                model: Type,
                attributes: ["name","id"],
                through: { attributes: [] },
            }
            
        })
        const pokeDev = await reqApi()
        let pokeFinal= await Promise.all(pokeDev)

        return res.json(allPokeDb.concat(pokeFinal))
    } catch (error) {
        res.send(error)
        
    }
})

module.exports = router;
