let str = "Learning JavaScript";
let sub = "Java";

function check (str, sub) {
    const size_str = str.length;
    const size_sub = sub.length;
    let found;

    for (let i = 0; i <= size_str - size_sub; i++) {
        found = true;
        
        for (let k = 0; k < size_sub; k++) {
            console.log(k);
            if (str[i+k] !== sub[k]){
                found = false;            
                break;
            }
                        
        }
        
        if (found){
            return true;
        }
        
    }
    return found;
}

console.log(check(str, sub));
