function some (arr, callback) {
    let size = arr.length;
    for (let i = 0; i < size; i++) {
        if(callback(arr[i], i, arr)) {
            return true;
        }
    }
    return false;
}

function callback(currentValue, index, array) {
    return index > 3;
}

let res = some([1,2,3,4,6], callback);
console.log(res);
