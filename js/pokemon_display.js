
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
console.log(data);
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

function showPokemon(num) {
    $("#pokemon_display").children().last().remove();
    let color = type_color[data[num][type_ind]];
    var $pokemon = 
        $('<div class="card display-card bg-light">' + 
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
    $("#pokemon_display").append($pokemon);
};
