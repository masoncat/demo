function par(){
    let a =1;
    function child(){
        let b = a+5;
        if (true){
            let a = 3;
            let a =2;
        }
        return b;
    }
    console.log(a);
    return child();
}
let res = par();
console.log(res);