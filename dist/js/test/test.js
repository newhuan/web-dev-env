let a = new Promise(function (resolve, reject) {
    resolve(1);
});
a.then(function(p){
    console.log(p, "test");
});