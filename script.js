var quantidade = document.getElementById('quantidade');
quantidade.addEventListener('keyup',()=>{
    if (event.key == 'Enter') {
        showLoading();
        pegaQuantidade(quantidade.value);
    }
})
function showLoading() {
    var loading = document.getElementById('loading');
    loading.style.display = 'block';
}
function hideLoading() {
    var loading = document.getElementById('loading');
    loading.style.display = 'none';
}
function pegaQuantidade(quantidade){
    fetch("https://pokeapi.co/api/v2/pokemon?limit="+quantidade)
    .then(response => response.json())
    .then(aLLpokemon => {
        var pokemons = [];

        aLLpokemon.results.map((val) => {


            fetch(val.url)
                .then(response => response.json())
                .then(pokemonSingle => {
                    pokemons.push({ nome: val.name, imagem: pokemonSingle.sprites.front_default });
                   var pokemon_boxes =  document.querySelector('.pokemon-boxes');
                   pokemon_boxes.innerHTML = "";

                    if (pokemons.length == quantidade) {
                        hideLoading();
                       pokemons.map(function(val){
                            console.log(val);
                            pokemon_boxes.innerHTML+=`
                            <div class="pokemon-box">
                                <img src="`+val.imagem+`"
                                    alt="">
                                <p>`+val.nome+`</p>
                            </div>
                            `
                       })
                        console.log(pokemons);
                    }
                })

        })

        pokemons.map((val) => {
            console.log(val.nome);
        })
    })
}