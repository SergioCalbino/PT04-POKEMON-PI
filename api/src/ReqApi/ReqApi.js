const axios = require('axios');

const reqApi = async () => {
        const url = '?offset=0&limit={limit}'
        const allpokemons = await axios("https://pokeapi.co/api/v2/pokemon?offset=0&limit=40")
        let pokeDev = await allpokemons.data.results.map((poke) => {
            return axios(poke.url)
                .then((poke) => {
                    return {
                    id: poke.data.id,
                    name: poke.data.name,
                    life: poke.data.stats[0].base_stat,
                    strength:  poke.data.stats[1].base_stat,
                    defense: poke.data.stats[2].base_stat,
                    speed: poke.data.stats[5].base_stat,
                    height: poke.data.height,
                    weight: poke.data.weight,
                    img: poke.data.sprites.other.dream_world.front_default,
                   // types: poke.data.types.map(type=> type.type.name)
                   types: poke.data.types.map(type => ({name: type.type.name, url: type.type.url}))
                }})

            });
            return pokeDev;
            
} 

module.exports = {
    reqApi
}