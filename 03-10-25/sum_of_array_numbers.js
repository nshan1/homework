function sum (arr) {
    let res = 0;
    for (let i = 0; i < arr.length; i++) {
        
        if (typeof arr[i] === 'number') {
            res += arr[i];
        }
        
    }
    return res;
}

let arr = ["ff", ":", true, 50,75,100, 'h']
console.log(sum(arr));
