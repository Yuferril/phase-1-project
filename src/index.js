const apiUrl = "https://pokeapi.co/api/v2/{endpoint}/";

function darkMode() {
  const element = document.body;
  element.classList.toggle("dark-mode");
}

const pokedex = document.getElementById("pokedex");

console.log(pokedex);

const fetchPokemon = async () => {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=151`;
  const res = await fetch(url);
  const data = await res.json();
  const pokemon = data.results.map((result, index) => (
    {
      ...result,
      id: index + 1,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
    }
  )) 
  console.log(data.results)
  displayPokemon(pokemon);
};

const displayPokemon = (pokemon) => {
  console.log(pokemon);
  const pokemonHTMLString = pokemon.map(
      (poke) => `
  <li class= "card" onclick="selectPokemon(${poke.id})">
    <img class="card-image" src="${poke.image}"/>
    <h2 class="card-title">#${poke.id}  ${poke.name}</h2>
  </li>
  `
    )
    .join("");
  pokedex.innerHTML = pokemonHTMLString;
};

const selectPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`
  const res = await fetch(url);
  const poke = await res.json();
  displayPopup(poke)
}

const displayPopup = (poke) => {
  const type = poke.types.map(type => type.type.name).join(', ');
  const image = poke.sprites['front_default']
  const htmlString = `
  <div class="popup">
    <button id="closeBtn" onclick="closePopup()">
    Close
    </button>
    <div class= "card">
      <img class="card-image" src="${image}"/>
      <h2 class="card-title">#${poke.id} ${poke.name}</h2>
      <p>Height: ${poke.height} | Weight: ${poke.weight} | Type: ${type}</p>
    </div>
  
  </div>`
  pokedex.innerHTML = htmlString + pokedex.innerHTML;
  console.log(htmlString)
}

const closePopup = () => {
  const popup = document.querySelector('.popup');
  popup.parentElement.removeChild(popup);
}

fetchPokemon();


function searchPoke(e) { 
  const nameOfPoke = e.target.value;
  const url = `https://pokeapi.co/api/v2/pokemon/${nameOfPoke}`
  fetch(url)
    .then((res) => res.json())
    .then((d) => displayPopup(d));
  
}

const input = document.getElementById("pokeInput");
input.addEventListener("change", searchPoke);

function clearBtn() {
  const input = document.getElementById("pokeInput");
    if (input.value !="") {
         input.value = "";
}
}