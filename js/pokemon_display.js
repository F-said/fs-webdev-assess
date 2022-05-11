import Pokemon from "./js/pokemon.js";
const file = "data/pokemon.csv"

var data = new Array();

var raw = new XMLHttpRequest();
raw.open("GET", file, false);
raw.send(null);  

// create array of pokemons
var pok_object = raw.responseText.split(/\r?\n|\r/);
for (var i = 0; i < pok_object.length; i++) {
    data.push(pok_object[i].split(','));
}
// create map of type and color
var type_color = {
    "Grass": "yellowgreen",
    "Fire": "indianred",
    "Water": "deepskyblue",
    "Bug": "darkseagreen",
    "Poison": "mediumslateblue",
    "Normal": "slategrey",
    "Electric": "gold",
    "Ground": "brown",
    "Fairy": "pink",
    "Fighting": "orange",
    "Ground": "brown",
    "Psychic": "violet",
    "Rock": "peru",
    "Ghost": "darkviolet",
    "Ice": "powderblue",
    "Dragon": "firebrick",
    "Dark": "dimgrey",
    "Steel": "slategrey",
}

// get indices of stats
let headers = data[0];
num_ind = headers.indexOf('#');
name_ind = headers.indexOf('Name');
type_ind = headers.indexOf('Type 1');
health_ind = headers.indexOf('HP');
attack_ind = headers.indexOf('Attack');
defense_ind = headers.indexOf('Defense');
desc_ind = headers.indexOf('Description');

var poke_num = 1; 
var opponent = 1; 

function listPokemon() {
    // create bootstrap list of pokemon
    let rows = Math.ceil(data.length/3)
    for (var i = 0; i < rows; i++) {
        var $row = $('<div class="row" style="padding-bottom:10px;"></div>')
        let start_ind = i * 3 + 1;
        for (var j = start_ind; j <= start_ind + 2; j++) {
            let poke_data = data[j];
            if (poke_data == undefined || poke_data.length <= 1) continue;
            let color = type_color[poke_data[type_ind]];
            var $pokemon = 
                $('<div class="col-sm-4">' + 
                    '<div class="card">' + 
                        '<img class="card-img-top bg-light" src="data/icons/'+ poke_data[num_ind] +'.png" alt="Pokemon Image"/>' + 
                        '<div class="card-body" style="background-color:' + color + '">' + 
                            '<h5 class="card-title"> #' + poke_data[num_ind] + ' ' + poke_data[name_ind] + '</h5>' + 
                            '<button type="button" class="btn btn-light" onclick="showPokemon(' + poke_data[num_ind] + ')">Stats</a>' + 
                        '</div>' + 
                    '</div>' +
                '</div>')
            $row.append($pokemon);
        }
        $("#pokemon_list").append($row);
    }
};

function generatePokeDisplay(num) {
    let color = type_color[data[num][type_ind]];
    return $(
    '<div class="card display-card bg-light">' + 
        '<img class="card-img-top display-image" src="data/pokemon/'+num+'.png" alt="Pokemon Image"/>' +
        '<div class="card-body" style="background-color:' + color + '">' +  
            '<h5 class="card-title">'+data[num][name_ind]+'</h5><hr/>' + 
            '<div class="row-inline">' +
                '<b class="card-text stat"> Type: '+data[num][type_ind]+'</b>' + 
                '<b class="card-text stat"> HP: '+data[num][health_ind]+'</b>' + 
                '<b class="card-text stat"> Attack: '+data[num][attack_ind]+'</b>' + 
                '<b class="card-text stat"> Defense:'+data[num][defense_ind]+'</b>' + 
            '</div><hr/>' +
            '<div>' +
                '<b>'+data[num][desc_ind]+'</b>' +
            '</div>' +
        '</div>' +
    '</div>')
}

function showPokemon(num) {
    if (isNaN(num) || (+(num) > 151 || +(num) < 1)) return; 
    poke_num = num;
    $("#pokemon_display").children().last().remove();
    var $pokemon = generatePokeDisplay(poke_num);
    $("#pokemon_display").append($pokemon);
};

function showOpponent() {
    $("#pokemon_opponent").children().last().remove();
    let rand_num = Math.floor(Math.random() * (data.length - 1) + 1);
    opponent = rand_num; 
    var $pokemon = generatePokeDisplay(opponent);
    $("#pokemon_opponent").append($pokemon);
};

function startBattle() {
    const poke1_data = data[poke_num];
    const poke2_data = data[opponent];
    const poke_1 = new Pokemon(poke1_data[name_ind], poke1_data[attack_ind], poke1_data[defense_ind], poke1_data[health_ind], poke1_data[type_ind]);
    const poke_2 = new Pokemon(poke2_data[name_ind], poke2_data[attack_ind], poke2_data[defense_ind], poke2_data[health_ind], poke2_data[type_ind]);

    alert(`Battle start between ${poke_1.name} and ${poke_2.name}. Battle ends after 10 turns or once a pokemon faints.`);
    let turns = 0;
    while (turns < 10) {
         poke_2.attackOpponent(poke_1);
         alert(`${poke_2.name} attacks for ${poke_2.attack}! ${poke_1.name} at ${poke_1.health} HP.`);
         if(poke_1.fainted) {
             alert(`${poke_1.name} fainted...`);
             break; 
         }
         poke_1.attackOpponent(poke_2);
         alert(`${poke_1.name} attacks for ${poke_1.attack}! ${poke_2.name} at ${poke_2.health} HP.`);
         if(poke_2.fainted) {
             alert(`${poke_2.name} fainted...`);
             break; 
         }
         turns++; 
    }
    if (turns >= 10) {
        alert("Both pokemon are equally matched. Battle ends in stalemate.")
    }
}