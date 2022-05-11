const MIN_VALUE = 0;
const DEF_NAME = "unnamed";
const DEF_TYPE = "unknown"; 

export class Pokemon {
    /**
     * A class to model a pokemon that takes and recieves damage
    Instance Variables
    ----------
    name:   string
            Pokemon name according to species
    attack: number
            Stat that it inflicts on other pokemon
    defense:    number 
                Stat that it uses to neglect other attack
    health: number
            Stat of number of hit points it can take
    type:   string
            Type of pokemon (bug, normal, rock, etc)
    """
     */
    constructor(name = DEF_NAME, attack = MIN_VALUE, defense = MIN_VALUE, health = MIN_VALUE, type = DEF_TYPE) {
        this.name = name;
        this.attack = attack;
        this.defense = defense;
        this.init_health = this.health = health;
        this.type = type;
        this.fainted = false; 
    }

    // getters 
    get name() {
        return this._name;
    }
    get attack() {
        return this._attack;
    }
    get defense() {
        return this._defense;
    }
    get health() {
        return this._health;
    }
    get type() {
        return this._type; 
    }
    get fainted() {
        return this._fainted; 
    }

    // setters
    set name(val) {
        this._name = val;
    }
    set attack(val) {
        this._attack = val;
    }
    set defense(val) {
        this._defense = val;
    }
    set health(val) {
        this._health = val;
    }
    set type(val) {
        this._type = val; 
    }
    set fainted(val) {
        this._fainted = val; 
    }

    takeDamage(damage) {
        if (this.fainted) return; 

        let damaged_health = this.health - damage; 
        this.health = Math.max(MIN_VALUE, damaged_health); 
        this.fainted = this.health == MIN_VALUE; 
    }
    attackOpponent(other) {
        let damage = this.attack - other.defense; 
        if (other.fainted || damage <= MIN_VALUE ) return; 

        other.takeDamage(damage); 
    }
    display() {
        return `${this.name.toUpperCase()} (${this.type.toUpperCase()}) ${this.health}/${this.init_health}`
    }
}

module.exports = Pokemon;