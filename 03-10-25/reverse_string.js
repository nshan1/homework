function reverse (str) {
    const size = str.length-1;
    let res = "";

    for (let i = size; i >= 0; i--) {
        res += str[i];
    }

    return res;
}

let s = "hello";
console.log(reverse(s));
