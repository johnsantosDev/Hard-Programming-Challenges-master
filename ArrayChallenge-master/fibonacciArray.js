function fibonacciArray(n) {
    // the [0, 1] are the starting values of the array to calculate the rest from
    var fibArr = [0, 1];

    for (let i = 0; i < n; i++){
        var len = fibArr.length - 1;
        fibArr.push(fibArr[len - 1] + fibArr[len]);
    }
    
    return fibArr;
}
   
var result = fibonacciArray(10);
console.log(result); // we expect back [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
