function for_each (arr, callback) {
    for (let i = 0; i < arr.length; i++) {
        arr[i] = callback(arr[i], i, arr);
    }
}

function callback (currentValue, index, array) {
    return String(currentValue)
}

let arr = [1,2,3,4];
let res = for_each (arr, callback);
console.log(arr);
