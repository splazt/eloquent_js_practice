//Analogous to the some method, arrays also have an every method. This one returns true when the given function returns true for every element in the array. In a way, some is a version of the || operator that acts on arrays, and every is like the && operator.

//Implement every as a function that takes an array and a predicate function as parameters. Write two versions, one using a loop and one using the some method.

//loop version
// function every(array, test) {
//   for (let el of array){
//     if (test(el)) continue;
//     else return false;
//   }
//   return true;
// }

//some version
function every(arr, test){
  // return arr.some(test).length === arr.length;
  //if there is an opposite of test, and any array qualifies, print false;
  return !arr.some(el => !test(el));
  // if (!arr.length)return true;
  // return arr.some(function(el, i, arr){
  //   return test(el) && i === arr.length - 1;
  // })
}

console.log(every([1, 3, 5], n => n < 10));
// → true
console.log(every([2, 4, 16], n => n < 10));
// → false
console.log(every([], n => n < 10));
// → true