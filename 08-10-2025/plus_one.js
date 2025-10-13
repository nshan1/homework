function f (arr) {
    let size = arr. length-1;
    let flag = 0;
    

    while (size >= 0) {
        if (arr[size] < 9) {
            arr[size] += 1;
            break;
        } else if (size == 0 && arr[size] == 9) {
            flag = 1;
            arr[size] = 0;
            arr.unshift(flag);
            return arr;
            

        } else {
            arr[size] = 0;
            size--;
            
        }
    }
    return arr;
}

let digits = [1,2,3];
let digits1 = [9];
let digits2 = [9,9,9];

let res = f(digits);
console.log(res);
