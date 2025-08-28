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

const create_pokemon_box = (pokemon) =>{
    let img = document.createElement('img')
    img.classList.add('pokemon-box__image')
    img.src = pokemon.sprites.front_default

    let name = document.createElement('h3')
    name.classList.add('pokemon-box__name')
    name.textContent = pokemon.name
    
    let pokedex_id = document.createElement('span')
    pokedex_id.classList.add('pokemon-box__pokedex-id')
    pokedex_id.textContent = pokemon.id

    let pokemon_box = document.createElement('li')
    pokemon_box.classList.add('gallery__pokemon-box')
    pokemon_box.appendChild(img)
    pokemon_box.appendChild(name)
    pokemon_box.appendChild(pokedex_id)

    return pokemon_box
}

const click_handler = async () => {
    let amount = Number(search_bar__input.value)
    let pokemons = await get_pokemon_by_amount(amount)
    let pokemon_boxs = pokemons.map(pokemon => create_pokemon_box(pokemon))

    let fragment = document.createDocumentFragment()
    pokemon_boxs.forEach(pokemon_box => fragment.appendChild(pokemon_box))
    gallery__ul.appendChild(fragment)
}

const search_bar__input = document.querySelector('.search-bar__input') 
const search_bar__btn = document.querySelector('.search-bar__btn')
const gallery__ul = document.querySelector('.gallery__ul')
console.log(search_bar__btn)

search_bar__btn.addEventListener('click', () => {
    click_handler()}
)         