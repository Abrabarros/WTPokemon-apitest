const pokemonImg = document.getElementById('pokemon-img');
const guessInput = document.getElementById('guess-input');
const guessBtn = document.getElementById('guess-btn');
const result = document.getElementById('result');
const nextBtn = document.getElementById('next-btn');

let currentPokemon = null;
let hintIndex = 0;
async function fetchRandomPokemon() {
    const randomId = Math.floor(Math.random() * 1000) + 1;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
    const pokemon = await response.json();
    currentPokemon = pokemon;
    hintIndex = 0;
    pokemonImg.src = pokemon.sprites.front_default;
    pokemonImg.style.filter = 'brightness(0%)';
}
function checkGuess() {
    const guess = guessInput.value.trim().toLowerCase();
    if (guess === currentPokemon.name.toLowerCase()) {
        result.textContent = `Parabéns! É o ${currentPokemon.name}!`;
        pokemonImg.style.filter = 'brightness(100%)';
    } else {
        provideHint();
    }
}
function provideHint() {
    const hints = [
        `Dica 1: Este Pokémon é do tipo ${currentPokemon.types.map(type => type.type.name).join(' e ')}.`,
        `Dica 2: A altura deste Pokémon é de ${currentPokemon.height / 10} metros.`,
        `Dica 3: Este Pokémon pesa ${currentPokemon.weight / 10} kg.`,
        `Dica 4: O nome deste Pokémon começa com a letra '${currentPokemon.name[0].toUpperCase()}'.`,

    ];

    if (hintIndex < hints.length) {
        result.textContent = hints[hintIndex];
        hintIndex++;
    } else {
        result.textContent = `É o ${currentPokemon.name}!`;
        pokemonImg.style.filter = 'brightness(100%)';
    }
}
guessBtn.addEventListener('click', checkGuess);
nextBtn.addEventListener('click', () => {
    guessInput.value = '';
    result.textContent = '';
    fetchRandomPokemon();
});
fetchRandomPokemon();