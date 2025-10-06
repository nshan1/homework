function arr_merg (arr1, arr2) {
    let res = arr1;
    let size = arr2.length;

    for (let i = 0; i < size; i++) {
        res.push(arr2[i]);
    }

    return res;
}


let arr1 = [1,2];
let arr2 = [3,4,5,6];

console.log(arr_merg(arr1, arr2));
