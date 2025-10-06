function sum (arr) {
    let res = 0;
    for (let i = 0; i < arr.length; i++) {
        res += arr[i];
    }
    return res;
}

let arr = [50,75,100]
console.log(sum(arr));
