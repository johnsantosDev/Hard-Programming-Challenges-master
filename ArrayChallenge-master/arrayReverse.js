function reverse(arr) {
    var temp, last = arr.length - 1;
    for (var i = 0; i < arr.length/2; i++){
        temp = arr[i];
        arr[i] = arr[last - i];
        arr[last - i] = temp;
    }
    return arr;
}
   
var result = reverse(["a", "b", "c", "d", "e"]);
console.log(result); // we expect back ["e", "d", "c", "b", "a"]
