// Write a higher-order function loop that provides something like a for loop statement.
//It takes a value, a test function, an update function, and a body function.
//Each iteration, it first runs the test function on the current loop value and stops if that returns false.
//Then it calls the body function, giving it the current value. Finally, it calls the update function to create a new value
//and starts from the beginning.

// When defining the function, you can use a regular loop to do the actual looping.

// Your code here.
// let loop = function(v, test, update, body){
//     let currentVal = v;
//     for (let i = 0; i < v; i++){
//         if(!test(currentVal)) return false;
//         body(currentVal);
//         currentVal = update(currentVal);
//     }
// }

let loop = function (initialVal, test, update, body){
    for (let v = initialVal; test(v); v = update(v)){
        body(v);
    }
}

loop(3, n => n > 0, n => n - 1, console.log);
// → 3
// → 2
// → 1