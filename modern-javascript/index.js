var moment = require('moment');
var math = require('mathjs');

console.log("hello world!")
console.log(`Today's Date: ${moment().format("MMMM Do YYYY")}`)

var statement = null;



let str = `This string
appears on multiple lines!`

let arr = [1, 4, 5, 6]

let obj = {apple: 'red', pear: 'green', orange: 'orange'}

console.log(obj)
console.log(arr.length)
console.log(str)


let p = new Promise(function(myResolve, myReject) {

  setTimeout(function() {
    if (statement !== null) {
      myResolve();
    }
    else {
      myReject();
    }
  }, 10000)
});

let secs = 2
setTimeout(function(){
  statement = window.prompt(`You've been on this page for ${secs} seconds! Give me a math problem:`);
  p.then(
    function() { window.alert(math.evaluate(statement)) },
    function() { window.alert("Window timed out.") }
  );
  }, (secs * 1000))





