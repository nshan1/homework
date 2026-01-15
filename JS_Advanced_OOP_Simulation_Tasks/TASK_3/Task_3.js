const fs = require("node:fs");

class CarNotAvailableError extends Error {
    constructor(msg){
        super(msg);
        this.name = "CarNotAvailableError";
        if("captureStackTrace" in Error){
            Error.captureStackTrace(this, CarNotAvailableError);
        }
        
    }
}

class InvalidRentalDurationError extends Error {
    constructor(msg){
        super(msg);
        this.name = "InvalidRentalDurationError";
        if("captureStackTrace" in Error){
            Error.captureStackTrace(this, InvalidRentalDurationError);
        }
    }
}

class validationError extends Error {
    constructor(msg){
        super(msg);
        this.name = "validationError";
        if("captureStacktrace" in Error){
            Error.captureStacktrace(this, validationError)
        }
    }
}


function validatedProperty(obj, p, validator){
    let value;
    Object.defineProperty(obj, p, {
        get () {
            return value;
        },
        set(v) {
            if(!validator(v)){
                throw new validationError("Validation error")
            }
            value = v;
        },
        enumerable:true,
            
    })    
}

function* idGenerator(){
    let id = 0;
    while(true){
        yield ++id;
    }
}

const idIterator = idGenerator();


function seasonFactor(price){
    let season = new Date().getMonth();
    
    if(season > 5 && season < 9){
        price += price* 0.2;
    }
    return price;
}

function demandFactor(price, count){
    if(count > 1){
        price += price* 0.5;
    }
    return price;
}


class Rental {
    rentalId = idIterator.next().value;
    constructor(customer, car, rentalDuration){
        if(new.target === Rental){
            throw new Error("Cannot instantiate abstract class")
        }
        this.customer = customer;
        this.car = car;
        this.rentalDuration = rentalDuration;

        this.rentCar = loggingWrapper(this.rentCar.bind(this), "rent");
        this.returnCar = loggingWrapper(this.returnCar.bind(this), "return")
        this.calculateRentalPrice = discountWrapper(this.calculateRentalPrice.bind(this));
    }

    rentCar(){
        throw new Error("rentCar: abstract class");
    };
    returnCar(){
        throw new Error("returnCar: abstract class");
    };
    calculateRentalPrice(){
        throw new Error("calculateRentalPrice: abstract class");
    };
}



class Car {
    static cars = [];
    rentCount = 0;
    constructor (make, model, rentalPricePerDay){
        validatedProperty(this, "make", (v) => typeof v === 'string' && v.trim().length);
        validatedProperty(this, "model", (v) => typeof v === 'string' && v.trim().length);
        validatedProperty(this, "rentalPricePerDay", (v) => typeof v === 'number' && v > 0);

        this.make = make;
        this.model = model;
        this.availability = true;
        this.rentalPricePerDay = seasonFactor(rentalPricePerDay);
    }

    static addCar(car){
        Car.cars.push(car)
    }

    markRented(){
        if(this.availability == true){
            this.availability = false;
            this.rentCount++;
        } else {
            throw new CarNotAvailableError("The car is already rented.");
        }
    }
    markAvailable(){this.availability = true}

    
}

class EconomyCar extends Car {}
class LuxuryCar extends Car {
    constructor(make, model, rentalPricePerDay, insurance, premium_service){
        super(make, model, rentalPricePerDay);
        validatedProperty(this, "insurance", (v) => typeof v === "number" && v >= 5);
        validatedProperty(this, "premium_service", (v) => typeof v === "number" && v >= 3);
        this.insurance = insurance;
        this.premium_service = premium_service;
    }

    totalRate(){return this.rentalPricePerDay + this.insurance + this.premium_service;}
}



class Customer {
    #rentalHistory = [];
    constructor(name, contactInfo){
        validatedProperty(this, "name", (v) => typeof v  === "string" && v.trim().length);
        validatedProperty(this, "contactInfo", (v) => /^\d{10}$/.test(v));

        this.name = name;
        this.contactInfo = contactInfo;
    }

    
    searchCars(filters){
        let result = []
        for(let i = 0; i < Car.cars.length; ++i){
            if(Object.values(Car.cars[i]).includes(filters)){
                result.push(Car.cars[i]);
            }
            
        }
        if(!result.length){
            return "cars not found";
        }
        return JSON.stringify(result);
    }

    addHistory(rental){
        this.#rentalHistory.push(rental)
    }
    viewRentalHistory(){return this.#rentalHistory}
}



function  loggingWrapper(fn, operation){
    return function(...args){
        let log = ""; 
        if(operation === "rent"){
            log = `[${this.customer.name} with id ${this.rentalId} rented ${this.car.make} for ${this.rentalDuration} days]`;
        } else {
            log = `[${this.customer.name} returned ${this.car.make} after ${this.rentalDuration} days]`;
        }
        
        
        fs.appendFileSync("log.txt", log + "\n");
        return fn.apply(this, args);
    }
    
    
}

function discountWrapper(fn){
    return function(...args) {
        let currentPrice = this.car.rentalPricePerDay;
        if(this.rentalDuration > 10){
            currentPrice -= currentPrice * 0.1;
        }
        this.car.rentalPricePerDay = currentPrice;
        return fn.apply(this, args);
    }
}

class standartRent extends Rental {
    rentCar(car){
        car.markRented();
        this.customer.addHistory({
            rentalId:this.rentalId,
            car: `${car.make} ${car.model}`,
            timestamp:Date.now(),
        })
                
    };
    returnCar(car){
        car.markAvailable();
    };
    calculateRentalPrice(car){
               
        return this.rentalDuration * demandFactor(car.rentalPricePerDay, car.rentCount);
    };
}

const customer1 = new Customer("Bob", "0123456789")
const customer2 = new Customer("Jack", "1112223334")
const car = new Car("BMW", "aaa", 100);
const car1 = new Car("BMW", "bbb", 10);
const car2 = new Car("OPEL", "cccc", 100);
const rent = new standartRent(customer1, car, 21)
const standartrent = new standartRent(customer2, car, 2)

Car.addCar(car)
Car.addCar(car1)
Car.addCar(car2)
rent.rentCar(car1);
rent.rentCar(car);
standartrent.rentCar(car2)
standartrent.returnCar(car2)
standartrent.rentCar(car2)
console.log(standartrent.calculateRentalPrice(car2))

console.log(customer1.searchCars("BMW"));
rent.calculateRentalPrice(car)
rent.returnCar(car1)
console.log(JSON.stringify(customer1.searchCars("BMW")))

console.log(rent.car.rentalPricePerDay)