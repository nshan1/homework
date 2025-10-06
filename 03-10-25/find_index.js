let n = 3;
let numList = [3, 6, 9, 12];

function f_index (arr, n) {
    
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === n) {
            return `index of the value ${n} is ${i}`;
        }
    }
    return `number ${n} not in array`;
}

console.log(f_index(numList, n));
