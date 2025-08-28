const get_pokemon_data = async (id) => {
    try{
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        let json = await response.json()
        return json
    }catch(err){
        console.log(err)
    }
}