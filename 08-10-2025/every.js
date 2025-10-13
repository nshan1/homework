function every (arr, callback) {
    let size = arr.length;
    for (let i = 0; i < size; i++) {
        if(!callback(arr[i], i, arr)) {
            return false;
        }
    }
    return true;
}

function callback(currentValue, index, array) {
    return index > 5;
}

let res = every([1,2,3,4,6], callback);
console.log(res);
