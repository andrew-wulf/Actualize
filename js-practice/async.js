// 1. Wait 2 seconds
// 2. Print out “First task done!”
// 3. Wait another 2 seconds
// 4. Print out “Second task done!”
// 5. Wait another 2 seconds
// 6. Print out “Third task done!”




// setTimeout(function() {
//   console.log('first task done!');
// }, 2000);

// setTimeout(function() {
//   console.log('second task done!');
// }, 4000);

// setTimeout(function() {
//   console.log('third task done!');
// }, 6000);



let tasks = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eight']

// for each (everything timer starts at once, with increasing timer lengths on each call)

// function task_increment(tasks) {
//   let increment = 2000;
//   let i = 1
//   tasks.forEach(function(task) {
//     setTimeout(function() {
//       console.log(`${task} task done!`);
//     }, increment * i); i++;
//   })
// }
// task_increment(tasks)


// recursive (successive timers only begin after the previous one ends due to recursive timer stack)
let task_status = false

function task_increment(tasks) {
  let myTasks = tasks;

  setTimeout(function() {
    console.log(`${tasks[0]} task done!`);
    myTasks.splice(0, 1);
    if (myTasks.length > 0) {
    task_increment(myTasks);
    }
    else {
      task_status = true
    }
  }, 2000);
}



function tasks_timeout(secs) {
  let limit = secs * 1000

  let p = new Promise(function(myResolve, myReject) {
    task_increment(tasks)

    setTimeout(function() {
      if (task_status === true) {
        myResolve();
      }
      else {
        myReject();
      }
    }, limit)
  });

  p.then(
    function() { console.log("all done!") },
    function() { console.log("tasks failed to complete in time.") }
  );
}

tasks_timeout(20)






