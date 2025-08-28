const get_pokemon_data = async (id) => {
    try{
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        let json = await response.json()
        return json
    }catch(err){
        console.log(err)
    }
}

const get_pokemon_by_amount = async (amount) => {
    try{
        let pokemons = []
        for (let i = 1; i <= amount; i++){
            let pokemon = await get_pokemon_data(i)
            pokemons.push(pokemon)
        }
        return pokemons
    }catch(err){
        console.log(err)
    }
}