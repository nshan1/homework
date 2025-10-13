function filter (arr, callback){
    let res = [];
    for (let i = 0; i < arr.length; i++){
        if(callback([arr[i]], i, arr)) {
            res.push(arr[i]);
        }
    }
    return res;
}

function callback (currentValue, index, array){
    return currentValue > 3;
}

let res = filter([99,2,1,3,55,4], callback);
console.log(res);
