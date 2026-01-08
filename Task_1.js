// STEP 1
class BankAccount {
    #balance;
    #transactions = [];
    constructor(accountNumber, type){
        if(new.target === BankAccount){
            throw new Error("abstract class not instantiable")
        }
        this.accountNumber = accountNumber;
        this.type = type;
    }

    getTransactionSummary(limit = 10) {
        let arr = this.#transactions.slice(0, limit-1);
        console.log(arr);
    }

    getAllTransactions(){
        let copy = Array.from(this.#transactions);
        console.log(copy);
    }

    
    deposit(amount){throw new Error('deposit - in abstract class');}
    withdraw(amount){throw new Error('withdrow - in abstract class');}
    getBalance(){throw new Error('getBalance - in abstract class');}
    transferFunds(targetAccount, amount, actor){throw new Error('transferFunds - in abstract class');}
}

class IndividualAccount extends BankAccount {
    #balance;
    #transactions = [];
    constructor(accountNumber, balance){
        super(accountNumber, 'individual');
        this.#balance = balance;
    }

    deposit(amount){
        this.#balance += amount;
        this.#transactions.push(new Transaction(this.accountNumber, amount, 'deposit'));
        }

    withdraw(amount){
        if(amount > this.#balance){
            console.log(`cannot withdraw more than  ${this.#balance}.`);
        } else{
            this.#balance -= amount;
            this.#transactions.push(new Transaction(this.accountNumber, amount, 'withdraw'));
        }
    }

    getBalance(){
        console.log(`The account balance is ${this.#balance}`);
    }
    transferFunds(targetAccount, amount, actor){
        if(this.withdraw(amount)){
            targetAccount.deposit(amount)
        }
        this.#transactions.push(new Transaction(this.accountNumber, amount, 'transfer'))
    }
}

class JointAccount extends BankAccount {
    #balance;
    #transactions = [];
    constructor(accountNumber, balance){
        super(accountNumber, 'joint')
        this.#balance = balance;
    }

    deposit(amount){
        this.#balance += amount;
        this.#transactions.push(new Transaction(this.accountNumber, amount, 'deposit'));
    }
    withdraw(amount){
        if(amount > this.#balance){
            console.log(`cannot withdraw more than  ${this.#balance}.`);
        } else{
            this.#balance -= amount;
            this.#transactions.push(new Transaction(this.accountNumber, amount, 'withdraw'));
        }
    }
    getBalance(){
        console.log(`The account balance is ${this.#balance}`);
    }
    transferFunds(targetAccount, amount, actor){
        if(this.withdraw(amount)){
            targetAccount.deposit(amount);
            this.#transactions.push(new Transaction(this.accountNumber, amount, 'transfer'));
        }
    }
}

//STEP 2
class Customer {
    #accounts = [];
    constructor(name, contactInfo){
        this.name = name;
        this.contactInfo = contactInfo;
    }

    get customer(){
        console.log(this._name);
    }
    set customer(name){
        if(typeof name === 'string' || name.length > 0){
            this._name = name;
        }
        
    }
    get phoneNumber(){
        console.log(this._contactInfo);
    }
    set phoneNumber(contact){
        let emailRegx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let phoneRegx = /^\d{10}$/;
        if(emailRegx.test(contact) || phoneRegx.test(contact)){
            this._contactInfo = contact;
        } else{
            throw new Error("invalid email or phone number");
        }
    }

    addAccount(account){
        this.#accounts.push(account);
    }

    viewAccounts(){
        console.log(this.#accounts);
    }

    viewTransactionHistory(accountNumber){
        if(this.#accounts.includes(accountNumber)){
            /*code*/
        }
    }

}

//STEP 3
class Transaction {
    constructor({accountNumber, amount, transactionType}){
        this.accountNumber = accountNumber;
        this.amount = amount;
        const types = ['deposit', 'withdraw', 'transfer'];
        if(types.includes(transactionType)){
            this.transactionType = transactionType;
        } else {
            throw new InvalidTransactionError('transaction must be a deposit, withdraw or transfer')
        }
        this.timestamp = Date.now();

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

//STEP 5
function loginWraper(){}
function PermissionWrapper(){}