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
    let allpokemons = []
    ///^[0-9]+$/.test(id)
    
    if(id.length === 36) {

        // const user = await User.findOne({
        //     attributes : ['id','name','email','contact'],
        //     where: {email:req.body.email}
        // }); 

        try {
            const pokeId = await Pokemon.findOne({
                attributes: ["name","id", "life", "strength", "defense","speed", "height", "weight"],
                where: {
                    id: id
                },
            })
            res.json(pokeId)
            
        } catch (error) {
            next(error)
            
        }
    }
        
        try {
            pokeApi = await axios.get(urlApi) //Me traigo todos los Pokemons de la Api por Id
            let pokeAllApi = [];
            console.log(pokeApi.data.forms[0].name)
            // Pusheo toda la data a mi arreglo

                pokeAllApi = pokeApi.data.forms.map((poke) => {
                    let pokemon = {
                        name: poke.name,
                        // life: poke.data.stats[0].base_stat,
                    // strength:  poke.data.stats[1].base_stat,
                    // defense: poke.data.stats[2].base_stat,
                    // speed: poke.data.stats[5].base_stat,
                    // height: poke.data.height,
                    // weight: poke.data.weight,
                    }
                    return pokemon

                   

            })
            console.log(pokeAllApi)
            res.json(pokeAllApi)
        } catch (error) {
            res.send(error)
           
            }
    })

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
        allpokemons = await axios(urlApi)
        let pokeDev = allpokemons.data.results.map((poke) => {
            return axios(poke.url)
                .then((poke) => {
                    return {
                    name: poke.data.name,
                    life: poke.data.stats[0].base_stat,
                    strength:  poke.data.stats[1].base_stat,
                    defense: poke.data.stats[2].base_stat,
                    speed: poke.data.stats[5].base_stat,
                    height: poke.data.height,
                    weight: poke.data.weight,
                   // img: poke.data.sprites
                    
                }})
            });
            res.json(await Promise.all(pokeDev))
       // let data = allpokemons.data
       // let dataSort = compare(data)
        
    } catch (error) {
        res.status(404).send({error: "El nombre del pokemon ingresado no existe"})
    }
})

// Vamos a crear el pokeon con los datos obligatorios
router.post('/pokemons', async (req, res) => {
    let {name, life, strength, defense, speed, height, weight} = req.body;
    if(!name) return res.status(404).send("El nombre es requerido")

       
    try {
        const newPokemon = await Pokemon.create({name, life, strength, defense, speed, height, weight})
        
        return res.status(201).json(newPokemon)
        } catch (error) {
            console.log(error)
            res.status(404).send(error)
        
    }

})

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


// router.get('/types', async (req, res) => {

//     try {
//         const typesInDB = await Type.findAll()
//         return res.json(typesInDB)
//     } catch (error) {
//         return res.status(404).send("No se pudo leer la DB")
//     }
   
// })







module.exports = router;
