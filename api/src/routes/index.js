const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
//const Pokemon = require('../models/Pokemon');
const { Pokemon, Type } = require("../db");
const { reqApi, reqApi2 } = require("../ReqApi/ReqApi");
const { Op } = require("sequelize");


const url = `https://pokeapi.co/api/v2/pokemon/`;
const urlType = `https://pokeapi.co/api/v2/type`;

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/get", (req, res) => {
  res.json("<h1>Bienvenidos</h1>");
});



// Hacemos el request a types y luego lo utilizo para la creación del pokemon en el post
router.get("/types", async (req, res) => {
  try {
    const allTypeDb = await Type.findAll();
    if (allTypeDb.length > 1) return res.json(allTypeDb);
    const allTypes = await axios.get(urlType);
    let typePoke = await allTypes.data.results.map((ty) => {
      return {
        name: ty.name,
        url: ty.url,
      };
    });

    await Type.bulkCreate(typePoke);
    res.json(typePoke);
  } catch (error) {}
});



router.post("/pokemons", async (req, res) => {
  let { name, life, strength, defense, speed, height, weight, types, img } =
    req.body;

  //Verifico si el nombre del pokemon ya existe en la base de datos y en la Api
  let urlApi = url + name.toLowerCase().trim();
  let atributesPokemon = {
    name,
    life,
    strength,
    defense,
    speed,
    height,
    weight,
    img,
  };

  try {
    await axios(urlApi);
    return res.send("El pokemon ya existe");
  } catch (error) {
    try {
      let newPoke = await Pokemon.create(atributesPokemon);
      await newPoke.addTypes(types);
      return res.send(
        `El pokemon ${newPoke.name} se ha creado de manera exitosa`
      );
    } catch (error) {
      return res.send(`El pokemon ya existe en la base de datos`);
    }
  }
});

//Traemos por params con ID el pokemon
router.get("/pokemons/:id", async (req, res) => {
  let { id } = req.params;
  let urlApi = url + id;

  ///^[0-9]+$/.test(id)

  if (/[a-zA-Z]/.test(id)) {
    try {
      const pokeId = await Pokemon.findOne({
        where: { id: id },
        include: {
          model: Type,
          attributes: ["name", "url"],
          through: { attributes: [] },
        },
      });
      if (pokeId !== null) {
        return res.json(pokeId);
      }
    } catch (error) {
      return res.status(404).send({ error: "El id ingresado no existe" });
    }
  }

  try {
    let pokeApi = await axios.get(urlApi); //Me traigo todos los Pokemons de la Api por Id
    pokeApi = pokeApi.data;
    let onePoke = {
      id: pokeApi.id,
      img: pokeApi.sprites.other.dream_world.front_default,
      name: pokeApi.name,
      types: pokeApi.types.map((type) => ({
        name: type.type.name,
        url: type.type.url,
      })),
      life: pokeApi.stats[0].base_stat,
      strength: pokeApi.stats[1].base_stat,
      defense: pokeApi.stats[2].base_stat,
      speed: pokeApi.stats[3].base_stat,
      height: pokeApi.height,
      weight: pokeApi.weight,
    };

    res.json(onePoke);
  } catch (error) {
    res.send({ error: "El id ingresado no existe" });
  }
});



//Hacemos el request de Name y todo los Pokemons
router.get("/pokemons", async (req, res) => {
  let { name } = req.query;
  let urlApi;
  let pok = [];

  if (name) {
    try {
		pok = await Pokemon.findOne({
        where: { name: { [Op.iLike]: name } },
        include: {
          model: Type,
          attributes: ["name", "id"],
          through: { attributes: [] },
        },
      });
      if (pok) {
        return res.json(pok);
      } else {
        urlApi = url + name.toLowerCase().trim();
        const poke = await axios(urlApi);

        let onlyPoke = {
          id: poke.data.id,
          name: poke.data.name,
          life: poke.data.stats[0].base_stat,
          strength: poke.data.stats[1].base_stat,
          defense: poke.data.stats[2].base_stat,
          speed: poke.data.stats[5].base_stat,
          height: poke.data.height,
          weight: poke.data.weight,
          img: poke.data.sprites.other.dream_world.front_default,
          types: poke.data.types.map((type) => ({
            name: type.type.name,
            url: type.type.url,
          })),
        };

        if (onlyPoke) return res.json(onlyPoke);
      }
    } catch (error) {
      return res.send("Nombre no encontrado");
    }
  }

  // Si no me pasan nombre, entonces traigo todos los pokemons de la DB y la Api
  try {
    let allPokeDb = await Pokemon.findAll({
      include: {
        model: Type,
        attributes: ["name", "id"],
        through: { attributes: [] },
      },
    });
    const pokeDev = await reqApi();
    const pokeDev2 = await reqApi2();

    let pokeFinal = await Promise.all(pokeDev);
    let pokeFinal2 = await Promise.all(pokeDev2);
    let pokeFusionApi = pokeFinal.concat(pokeFinal2); // Fusiono los request en uno

    console.log(allPokeDb)
    allPokeDb = allPokeDb.map((pokemon) => ({
      id: pokemon.id,
      name: pokemon.name,
      img: pokemon.img,
      
      types: pokemon.types.map((type) => ({ name: type.name })),
    }));
    /* Asi viene de la base de datos
    {
        id: valor,
        name: valor,
        life: valor,
        weigth: valor,
        heigth: valor
        types: [
            {
                id: valor,
                name: valor,
                creatad: valor
            }
        ]
    },
    {
        id:valor,
        name:valor,
        types: [{name: valor}],
        img: valor
    } */
    console.log(allPokeDb);
    return res.json(allPokeDb.concat(pokeFusionApi));
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
