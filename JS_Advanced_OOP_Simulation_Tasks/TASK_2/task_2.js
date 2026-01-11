// ---------------------STEP 8-----------------------
class DishNotFoundError extends Error {
    constructor(msg){
        super(msg);
        this.name = 'DishNotFoundError';
    }
}

class InvalidOrderError extends Error{
    constructor(msg){
        super(msg);
        this.name = 'InvalidOrderError';
    }
}


// ---------------------STEP 4-----------------------
function defineValidatedProperty(obj, property, validator){
    let value;

    Object.defineProperty(obj, property, {
        get() {
            return value;
        },
        
        set(v){
            if(!validator(v)){
                throw new Error("validation error")
            }
            value = v;
        },
        enumerable:true,
    })
}


// ---------------------STEP 5-----------------------
function loggingWraper(fn){
    return function(...args){
        const log = `${this.name} ordered ${JSON.stringify(args[0].dishes)}`;
        console.log(log);
        return fn.apply(this, args)
    }
}

function discountWrapper(fn){
    return function(...args) {
        let totalprice = fn.apply(this, args)
        if(totalprice > 5000 || this.customer.orderHistory > 5){
            totalprice -= totalprice*0.1;
        }
        return totalprice; 
    }
}


// ---------------------STEP 7-----------------------

class Dish{
    constructor(name, price){
        this.name = name;
        this.price = price;
    }
}

class Appetizer extends Dish{}
class Entree extends Dish{}
class Dessert extends Dish{}


// ---------------------STEP 1, 6-----------------------

class Menu {
    #dishes = {};

    _addInMenu(dish){
        this.#dishes[dish.name] = dish.price;
    }
    _deleteFromMenu(dish){
        delete this.#dishes[dish.name];
    }

    increasePrice(dishName, percent){
        if(dishName in this.#dishes){
            this.#dishes[dishName] += (this.#dishes[dishName]* percent)/100;
        }
    }

    decreasePrice(dishName, percent){
        if(dishName in this.#dishes){
            this.#dishes[dishName] -= (this.#dishes[dishName]* percent)/100;
        }
    }

    //applyDemandPricing(popularDishNames){}


    addDish(dish){throw new Error('addDish: abstract class.');}
    removeDish(dishName){throw new Error('removeDish: anstract class.');}
    viewMenu(){return this.#dishes;}
}

class AppetizersMenu extends Menu {
    addDish(dish){this._addInMenu(dish);}
    removeDish(dishName){this._deleteFromMenu(dishName);}
}

class EntreesMenu extends Menu {
    addDish(dish){this._addInMenu(dish);}
    removeDish(dishName){this._deleteFromMenu(dishName);}
}

class DessertsMenu extends Menu {
    addDish(dish){this._addInMenu(dish);}
    removeDish(dishName){this._deleteFromMenu(dishName);}
}


// ---------------------STEP 2-----------------------

class Customer {
    orderHistory = []
    constructor(name, contactInfo){
        defineValidatedProperty(this, 'name', v => typeof v === 'string' && v.length > 0);
        defineValidatedProperty(this, 'contactInfo', v => /^\d{10}$/.test(v));
        
        this.name = name;
        this.contactInfo = contactInfo;

        this.placeOrder = loggingWraper(this.placeOrder.bind(this));
    }

    placeOrder(order){
        this.orderHistory.push(order);
    }
    viewOrderHistory(){return JSON.stringify(this.orderHistory);}
}


// ---------------------STEP 3-----------------------

class Order {
    #totalPrice = 0;
    dishes = [];
    constructor(){
        // if(customer instanceof Customer){
        //     this.customer = customer;
        // } else {
        //     throw new Error('Only valid customers can place orders.')
        // }

        this.getTotal = discountWrapper(this.getTotal.bind(this))
    }

    addDish(dishName, menus){
        if(dishName in menus.viewMenu()){
            let dish = {
                name:dishName,
                price: menus.viewMenu()[dishName],
            };
            this.dishes.push(dish);
            this.#totalPrice += dish.price;
        }
    }
    getTotal(){return this.#totalPrice;}
    viewSummary(){
        const summary = {
            
            dishes: this.dishes,
            totalSum: this.getTotal(),
        }
        return summary;
    }
}


let dish = new Dessert('bulki', 6000);
let menu = new DessertsMenu()
menu.addDish(dish);
menu.increasePrice('bulki', 10);
console.log(menu.viewMenu())
let customer1 = new Customer('customer1', "0123456789")
let order = new Order(customer1);

order.addDish('bulki', menu);
customer1.placeOrder(order);
console.log(order.viewSummary());
console.log(customer1.viewOrderHistory())