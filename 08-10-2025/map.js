function map (arr, callback) {
    let res = [];
    for (let i = 0; i < arr.length; i++) {
        res.push(callback(arr[i], i, arr));
    }
    return res;
}

function callback (currrentValue, index, array) {
    return currrentValue*=10;
}

let res = map ([1,2,3,4,5], callback);
console.log(res);
