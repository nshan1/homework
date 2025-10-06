function happy_num (n) {
    let num = 0;
    let arr = Array.from(n.toString());
    let size = arr.length;

    for (let i = 0; i < size; i++) {
        num += Math.pow(+arr[i], 2);      

    }

    if (num === 4) {
        return false;
    }
    
    if (num === 1) {
        return true;
    } else {
        return happy_num(num);
    }
    
}

console.log(happy_num(6));
