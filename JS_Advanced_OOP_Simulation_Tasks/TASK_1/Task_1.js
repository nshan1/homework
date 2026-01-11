
const fs = require('node:fs')
// STEP 1
class BankAccount {
    #balance = 0;
    #transactions = [];
    constructor(accountNumber, type){
        if(new.target === BankAccount){
            throw new Error("abstract class not instantiable")
        }

        defindeValidatedProperty(this, "accountNumber", v => typeof v === 'string' && /^\d{10}$/.test(v));

        this.accountNumber = accountNumber;
        this.type = type;
    }

    getTransactionSummary(limit = 10) {return this.#transactions.slice(-limit);}

    getAllTransactions(){return [...this.#transactions];}

    
    addBalance(amount){
        if(amount < 0){
            throw new InvalidTransactionError("amount must be positive")
        }
        this.#balance += amount;
    }

    reducBalance(amount){
        if(amount < 0) {
            throw new InvalidTransactionError("amount must be positive");
        }
        if(amount > this.#balance){
            throw new InsufficientFundsError("insufficient funds")
        }
        this.#balance -= amount;
    }

    addTransaction(transaction){
        this.#transactions.push(transaction);
    }
        
    deposit(amount){throw new Error('deposit - in abstract class');}
    withdraw(amount){throw new Error('withdrow - in abstract class');}
    getBalance(){return this.#balance}
    transferFunds(targetAccount, amount, actor){throw new Error('transferFunds - in abstract class');}
}

class IndividualAccount extends BankAccount {
    
    constructor(accountNumber){
        super(accountNumber, 'individual');

        this.deposit = loginWraper(this.deposit.bind(this), 'deposit');
        this.withdraw = loginWraper(this.withdraw.bind(this), 'withdraw');
        this.transferFunds = PermissionWrapper(loginWraper(this.transferFunds.bind(this), 'transfer'));
    }

    

    deposit(amount){
        this.addBalance(amount);
        const transaction = new Transaction({
            accountNumber:this.accountNumber,
            amount,
            transactionType:'deposit',
        })
        this.addTransaction(transaction);
    }

    withdraw(amount){
        this.reducBalance(amount);
        const transaction = new Transaction({
            accountNumber:this.accountNumber,
            amount,
            transactionType:'withdraw',
        })
        this.addTransaction(transaction);
    }

    transferFunds(targetAccount, amount, actor){
        this.withdraw(amount);
        targetAccount.deposit(amount);
        const transaction = new Transaction({
            accountNumber:this.accountNumber,
            amount,
            transactionType:'transfer',
            targetAccount: targetAccount.accountNumber,
        });
        this.addTransaction(transaction);
    }

    
}

class JointAccount extends BankAccount {
    
    constructor(accountNumber, owners){
        super(accountNumber, 'joint')
        this.owners = owners;
    }

    isOwner(actor){
        return this.owners.includes(actor);
    }

    deposit(amount){
        this.addBalance(amount);
        const transaction = new Transaction({
            accountNumber:this.accountNumber,
            amount,
            transactionType: "deposit",
        })
        this.addTransaction(transaction)
    }

    withdraw(amount){
        this.reducBalance(amount);
        const transaction = new Transaction({
            accountNumber:this.accountNumber,
            amount,
            transactionType: "withdraw"
        })
        this.addTransaction(transaction);
    }

    transferFunds(targetAccount, amount, actor){
        if(!this.isOwner(actor)){
            throw new ValidationError(`${actor} is not owner`)
        }
        
        this.withdraw(amount);
        targetAccount.deposit(amount);

        const transaction = new Transaction({
            accountNumber:this.accountNumber,
            amount,
            transactionType:"transfer",
            toAccount:targetAccount.accountNumber,

        })
        this.addTransaction(transaction);
    }
}

//STEP 2
class Customer {
    #accounts = [];
    constructor(name, contactInfo){
        defindeValidatedProperty(this, "name", v => typeof v === 'string' && v.length >0);
        defindeValidatedProperty(this, "contactInfo", v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || /^\d{10}$/.test(v));
        this.name = name;
        this.contactInfo = contactInfo;
        this.isAuthorized = true;
    }

    addAccount(account){
        this.#accounts.push(account);
    }

    viewAccounts(){
        console.log(this.#accounts);
    }

    viewTransactionHistory(accountNumber){
        const acc = this.#accounts.find(a => a.accountNumber === accountNumber);
        return acc;
    }

}

//STEP 3
class Transaction {
    constructor({accountNumber, amount, transactionType, fromAccount = null, toAccount = null}){
        this.accountNumber = accountNumber;
        this.amount = amount;
        const types = ['deposit', 'withdraw', 'transfer'];
        if(types.includes(transactionType)){
            this.transactionType = transactionType;
        } else {
            throw new InvalidTransactionError('transaction must be a deposit, withdraw or transfer')
        }
        this.timestamp = Date.now();
        this.fromAccount = fromAccount;
        this.toAccount = toAccount;

    }
}


//STEP 8
class InsufficientFundsError extends Error {
    constructor(msg){
        super(msg);
        this.name = 'InsufficientFundsError';
    }
}

class InvalidTransactionError extends Error {
    constructor(msg){
        super(msg);
        this.name = 'InvalidTransactionError';
    }
}

class AuthorizationError extends Error {
    constructor(msg){
        super(msg);
        this.name = 'AuthorizationError';
    }
}

class ValidationError extends Error {
    constructor(msg){
        super(msg);
        this.name = 'ValidationError';
    }
}

function defindeValidatedProperty(obj, property, validator){
    let value;
    Object.defineProperty(obj, property, {
        get(){
            return value;
        },

        set(v){
            if(!validator(v)){
                throw new ValidationError(`Invalid property: ${property}`);
            }
            value = v;
        },
        enumerable:true,
    })
}



//STEP 5
function loginWraper(fn, operation){
    return function(...args){
        let timestamp = new Date().toISOString();
        let log = `[${timestamp}] ${operation} | account: ${this.accountNumber}`;

        if(operation === "transfer"){
            const [target, amount] = args;
            log += `-> ${target.accountNumber} | amount: ${amount}`;
        } else {
            const [amount] = args;
            log += ` | amount: ${amount}`;
        }
        fs.appendFileSync('log.txt', log + '\n');
        return fn.apply(this, args);

    };
}

function PermissionWrapper(fn){
    return function(target, amount, actor){
        if (this instanceof JointAccount){
            if(!this.isOwner(actor)){
                throw new AuthorizationError(`${actor} is not owner.`);
            }
        } else {
            if(!actor || actor.isAuthorized !== true){
                throw new AuthorizationError(`${actor} is not authorizated.`)
            }
        }

        return fn.call(this, target, amount, actor);
    };
}


// const armen = new Customer("Armen", "armen@gmail.com");
// const anna = new Customer("Anna", "0987654321");

// const armenacc = new IndividualAccount("1234567890");
// const jointacc = new JointAccount("5555566666", ["Armen", "Anna"]);

// armen.addAccount(armenacc);
// armen.addAccount(jointacc);
// anna.addAccount(jointacc);

// armenacc.deposit(5000);
// console.log(`Armen has ${armenacc.getBalance()}`);

// armenacc.transferFunds(jointacc, 2000, armen);
// console.log(`joint account: ${jointacc.getBalance()}`);

// try {
//     jointacc.transferFunds(armenacc, 1000, "stranger");
// } catch (error) {
//     console.error(`${error.name}: ${error.message}`);
// }

