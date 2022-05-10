
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


// get indices of stats
let headers = data[0];
num_ind = headers.indexOf('#');
name_ind = headers.indexOf('Name');
type_ind = headers.indexOf('Type 1');
health_ind = headers.indexOf('HP');
attack_ind = headers.indexOf('Attack');
defense_ind = headers.indexOf('Defense');

function listPokemon() {
    // create bootstrap list of pokemon
    let rows = Math.ceil(data.length/3)
    for (var i = 0; i < rows; i++) {
        var $row = $('<div class="row"></div>')
        let start_ind = i * 3 + 1;
        for (var j = start_ind; j <= start_ind + 2; j++) {
            let poke_data = data[j];
            if (poke_data == undefined || poke_data.length <= 1) continue;
            var $pokemon = 
                $('<div class="col-sm-4">' + 
                    '<div class="card">' + 
                        '<img class="card-img-top" src="data/icons/'+ poke_data[num_ind] +'.png" alt="Pokemon Image"/>' + 
                        '<div class="card-body">' + 
                            '<h5 class="card-title"> #' + poke_data[num_ind] + ' ' + poke_data[name_ind] + '</h5>' + 
                            '<button type="button" class="btn btn-primary" onclick="showPokemon(' + poke_data[num_ind] + ')">Stats</a>' + 
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
    var $pokemon = 
        $('<div class="card align-items-center justify-content-center">' + 
            '<img class="card-img-top" src="data/pokemon/'+num+'.png" alt="Pokemon Image" style="width: 50%;"/>' +
            '<div class="card-body">' +  
            '<h5 class="card-title">'+data[num][name_ind]+'</h5>' + 
            '<h5 class="card-text">'+data[num][type_ind]+'</h5>' + 
            '<h5 class="card-text">'+data[num][health_ind]+'</h5>' + 
            '<h5 class="card-text">'+data[num][attack_ind]+'</h5>' + 
            '<h5 class="card-text">'+data[num][defense_ind]+'</h5>' + 
        '</div>')
    $("#pokemon_display").append($pokemon);
};
