// exrecise N1
class Rectangle {
    constructor(width, height) {
        this.width = width;
        this.height =height;
    }
    area(){
        return this.width * this.height;
    }

    perimeter(){
        return (this.width + this.height)*2;
    }
}

//exrecise N2
class BankAccount {
    constructor(owner, balance = 0) {
        this.owner = owner;
        this.balance = balance;
    }
    deposit(amount){
       this.balance += amount;
    }

    withdraw(amount){
        if(this.balance < amount) {
            return "Insufficient funds";
        }
        this.balance -= amount;
    }
}
let account = new BankAccount('Bob', 100)
console.log(account.deposit(50))
console.log(account.withdraw(25))
console.log(account.balance)

// excercise N3
class Student {
    constructor(name){
        this.name = name;
        this.grades = [];
    }
    addGrade(grade){
        this.grades.push(grade);
    }
    average(){
        if(this.grades.length == 0){
            return 0;
        }
        return (this.grades.reduce((acc, i)=> acc+=i)) / this.grades.length
    }
}

//exercise N4
class MathHelper {
    static square(n) {
        return n * n;
    }
}
MathHelper.square(4)


//exercise N5
class Animal {
    constructor(name){
        this.name = name;
    }
    speak(){
        console.log(`${this.name} makes a sound`)
    }
}

class Dog extends Animal {
    speak(){
        console.log(`${this.name} barks`);
    }
}
