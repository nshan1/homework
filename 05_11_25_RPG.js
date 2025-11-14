class Charachter {
    constructor(name, health, attackPower){
        this.name = name;
        this.health = health;
        this.attackPower = attackPower;
    };

    attack(target){
        //return `${this.name} attacks ${target.name} for power ${this.attackPower}`
        target.health -= this.attackPower;
    };

    takeDamage(amount){
        this.health -= amount;
    };

    isAlive(){
        if(this.health > 0){
            return true;
        }
    };

    toString(){
        return `${this.name} (Health: ${this.health})`
    };
}

class Wizard extends Charachter {
    constructor(name, health, attackPower, mana=0){
        super(name, health, attackPower);
        this.mana = mana;
    };
    castSpell(target){
        if(this.mana > 20){
            
            this.mana -=20;
            let spellPower = this.attackPower * 2
            // target.health -= spellPower;
            target.takeDamage(spellPower)
            console.log(`${this.name} casts a powerfull spell on ${target.name} for ${spellPower} damage`);
            
        } else {
            console.log('no mana is left');
            
        }
    };

    toString(){
        return `${super.toString()} mana ${this.mana}`
    }

}

class Warrior extends Charachter {
    constructor(name, health, attackPower, armor){
        super(name, health, attackPower);
        this.armor = armor;
    }

    takeDamage(amount){
        this.health -= (amount - this.armor);
        console.log(`${this.name} armor bloked ${this.armor}! Health.now ${this.health}`)
    };

    toString(){
        return `${super.toString()} armor ${this.armor}`
    }
}

let wizzard = new Wizard('Merlin', 10, 30, 50)
let warrior = new Warrior('Arthur', 100, 10, 5)

console.log("=== Battle Start ===");

while(wizzard.isAlive() && warrior.isAlive()){
    wizzard.castSpell(warrior);
    warrior.takeDamage(25)
    
    if(warrior.isAlive()){
        warrior.attack(wizzard);
        warrior.toString()
    }
    console.log("------------------");
}
console.log("=== Battle Over ===");

console.log('winner', wizzard.isAlive()?wizzard.name:warrior.name);
