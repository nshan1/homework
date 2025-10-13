function indexof (arr, s_el, fromindex) {
    let size = arr.length;
    
    if (fromindex >= size) {
        return -1;
    }
    
    if (s_el.length > 1){
        for(let i = fromindex; i < size; i++) {
            let flag = true;
            for (let j = 0; j < s_el.length; j++) {
                if (arr[i+j] !== s_el[j]){
                    flag = false;
                    break;
                } else {
                    flag = true;
                }
            }
            if (flag) {return i}
        }
               
    } else {

        for (fromindex; fromindex < size; fromindex++) {
            if (arr[fromindex] == s_el) {
               return fromindex;
            }
        }
    }

    return -1;
}

let res = indexof("nshanhakobyan", "by", 2)
console.log(res);

