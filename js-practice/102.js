//given an array of nested arrays, remove any falsy values


problem_arr = [1, [2, 3, null], false, 
[3, 5, [6, 9, null, [[null, 1], 8, 9, [10]]]], 176]


// function solve(arr) {
//   let i = 0;
//   while ((i < arr.length)) {
//     let curr = arr[i]
//     console.log(curr)

//     if (curr == null || curr === false) {arr.splice(i, 1); i--}

//     else { if (Array.isArray(curr)) {arr[i] = solve(curr)}
//       }
//     i++
//     }

// return arr
// }



function solve(arr) {
  var i = 0;
  var memo = [];

  while ((i < arr.length || memo.length > 0)) {
    if (i >= arr.length) {
      
      vars = memo.pop()
      i = vars[0] + 1
      arr = vars[1]
    }

    let curr = arr[i]
    console.log(curr)

    if (curr == null || curr === false) {arr.splice(i, 1)}

    else { if (Array.isArray(curr)) {
      memo.push([i, arr])
      arr = curr
      i = 0
      
    } else {i++}
      }
    }
  return arr
  }




console.log(solve(problem_arr))
console.log(problem_arr[2][2][2])

