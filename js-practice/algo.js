// Problem 1: Return the lowest index at which a value (second argument) should be inserted into an array (first argument) once it has been sorted. The returned value should be a number.
// For example, getIndexToIns([1,2,3,4], 1.5) should return 1 because it is greater than 1 (index 0), but less than 2 (index 1).
// Likewise, getIndexToIns([20,3,5], 19) should return 2 because once the array has been sorted it will look like [3,5,20] and 19 is less than 20 (index 2) and greater than 5 (index 1).
// function getIndexToIns(arr, num) {
// }
// getIndexToIns([40, 60, 30, 100, 75, 1], 50) // => 3 
// Problem 2: Return the provided string with the first letter of each word capitalized. Make sure the rest of the word is in lower case
// // given
// function titleCase(str) {
// }
// titleCase("bEst LeSSon Of thE Year") // => "Best Lesson Of The Year"




// select last item

// once index is 0, start over, repeat process for n length of array


function sort(arr) {
  let z = 0;
  let j = 0;

  while (j < arr.length) {

    let i = arr.length - 1;

    while (i > z) {

      // compare with prev, if smaller, swap, if larger, change active item 
      if (arr[i] < arr[i - 1]) {
        var curr = arr[i];

        arr[i] = arr[i - 1];
        arr[i - 1] = curr;
      }
      i--;
    }

    z++;
    j++;
  }
}


function binarySearch(arr, item) {

  let low = arr[0];
  let high = arr[arr.length - 1];

  while (low < high) {
    let mid = Math.floor(arr.length / 2)

  }

}


let arr = [40, 60, 30, 100, 75, 1];
sort(arr);
console.log(arr);


console.log(binarySearch(arr, 60))