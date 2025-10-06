function odd_even (num) {
    if (num % 2 === 0) {
        return "number is even";
    } else {
        return "number is odd";
    }
}

let n = 6;
console.log(odd_even(n));