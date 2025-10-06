function toUpper (str) {

    const size = str.length;
    let res = '';
    let code = 0;
    
    for (let i = 0; i < size; i++) {
        code = str.charCodeAt(i);
        if (code >= 97 && code <= 122) {
            res += String.fromCharCode(code - 32);
        } else {
            res += str[i];
        }
    }
    return res
}

let str = 'dsdasdas11A';
console.log(toUpper(str));