const get_pokemon_data = async (id) => {
    try{
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        let json = await response.json()
        return json
    }catch(err){
        console.log(err)
    }
}

const get_pokemon_by_amount = async (amount, already_showed) => {
    // console.log(`get pokemon by amount with amount = ${amount} and already_showed = ${already_showed}`)
    try{
        let pokemons = []
        for (let i = already_showed + 1; i <= amount + already_showed; i++){
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

const load_boxes_by_amount = async (amount, already_showed = 0) => {
    // console.log(`load boxes by amount amount = ${amount} already_showed = ${already_showed}`)
    let pokemons = await get_pokemon_by_amount(amount, already_showed)
    let pokemon_boxs = pokemons.map(pokemon => create_pokemon_box(pokemon))
    console.log(pokemon_boxs)
    let fragment = document.createDocumentFragment()
    pokemon_boxs.forEach(pokemon_box => fragment.appendChild(pokemon_box))
    gallery__ul.appendChild(fragment)
}

const click_handler = () => {
    //todo una funcion que busque por nombres los pokemones
}

const search_bar__input = document.querySelector('.search-bar__input') 
const search_bar__btn = document.querySelector('.search-bar__btn')
const gallery__ul = document.querySelector('.gallery__ul')
const show_more_btn = document.querySelector('.show_more_btn')

let showed_pokemons = 20

search_bar__btn.addEventListener('click', () => {
    click_handler()
})     

load_boxes_by_amount(showed_pokemons)

show_more_btn.addEventListener('click', () => {
    load_boxes_by_amount(10, showed_pokemons)
    showed_pokemons += 10
})