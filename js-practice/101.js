//Given array of objects, return an object of arrays

var arr = [{name: 'apple', price: 4.50, color: 'red'}, {name: 'banana', price: 6.07, color: 'yellow'}, {name: 'pear', price: 2, color: 'green'}]

var obj = {}

// for (i=0; i < arr.length; i++) {
//   var curr = arr[i]
//   var keys = Object.keys(curr)
//   var new_arr = []
  
//   for (j=1; j < keys.length; j++) {
//     new_arr.push([keys[j], curr[keys[j]]])
//   }
//   obj[curr['name']] = new_arr
// }
//   console.log(obj)



//use foreach
function inverse(x) {obj[x["name"]] = [x["price"], x["color"]]}

arr.forEach(inverse)
console.log(obj)
