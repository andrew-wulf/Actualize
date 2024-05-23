//challenge: make a terminal app in js (easier pleaseee) using a different API than last time. Include 3 different types of api calls.
// sports stats should be a good start!




const readline = require('node:readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function input() {
  let output = null
  rl.question(`What's your name?`, name => {
    console.log(`Hi ${name}!`);
    rl.close();
  
  });
  setTimeout(function() {
    return output
  }, 6000)
}

comm = input()
console.log(comm)
console.log(5)

//there's gotta be a better way :'(