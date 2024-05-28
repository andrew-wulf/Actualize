// Keeping this in case I wanna see it again


// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)
//   const [heading, setHeading] = useState('Home Page')
//   //const [output, setOutput] = useState("")
//   const [input, setInput] = useState("slow")


//   const react = document.getElementById("react")
//   const vite = document.getElementById("vite")
//   const symbol = document.getElementsByClassName("logo react")[0]

//   function button_press() {
//     setCount((count) => count + 1);
//     let num = count + 1 
//     if (num % 5 == 0) {
//       react.className = 'true';
//       if (num % 3 == 0) {
//         vite.className = 'true';
//         setHeading(() => "FizzBuzz")
//       }
//       else {
//         vite.className = 'false';
//         setHeading(() => "Buzz")
//       }
//     }
//     else {
//       react.className = 'false';
//       if (num % 3 == 0) {
//         vite.className = 'true';
//         setHeading(() => "Fizz")
//       }
//       else {
//         vite.className = 'false';
//         setHeading(() => "Home Page")
//       }
//     }
//   }
  
//   function submit(e) {
    
//     e.preventDefault();
//     //setOutput(input)

//     if (input === "slow") {
//       symbol.style.animationIterationCount = 'unset';
//       symbol.id = "slow";
//       symbol.style.animationIterationCount = 'infinite';
//     }
//     if (input === "medium") {
//       symbol.style.animationIterationCount = 'unset';
//       symbol.id = "medium";
//       symbol.style.animationIterationCount = 'infinite';
//     }
//     if (input === "fast") {
//       symbol.style.animationIterationCount = 'unset';
//       symbol.id = "fast";
//       symbol.style.animationIterationCount = 'infinite';
//     }
//   }

//   // function countdown() {
//   //   running = true;
//   //   setTimeout(() => {
//   //     let secs = localStorage.getItem('timerValue'); // Parse the value as an intege
//   //     secs--;
//   //     document.getElementById('timer').innerHTML = secs;
//   //     localStorage.setItem('timerValue', secs)
//   //     //console.log(time_left)

//   //     if (secs > 0) {
//   //       countdown()
//   //     }
//   //     else {
//   //       self_destruct()
//   //     }
//   //   }, 2000);
    
//   // }
  
//   // function self_destruct() {
//   //   localStorage.setItem('timerValue', 60)
//   //   let body = document.getElementById("main")
//   //   body.style.display = "none"
//   // }


//   return (
//     <>
//       <div id="main">
//         <div>
//         <a href="https://vitejs.dev" target="_blank" id="vite" className='false'>
//           <img src={viteLogo} className="logo" alt="Vite logo"/>
//         </a>
//         <a href="https://react.dev" target="_blank" id="react" className='false'>
//           <img src={reactLogo} className="logo react" alt="React logo" id="slow"/>
//         </a>
//       </div>
//       <h1>{heading}</h1>
//       <div className="card">
//         <button onClick={() => button_press()} >
//           count is {count}
//         </button>

//         <form method="post" onSubmit={submit}>
//           <label>
//           Atom Speed: <input name="myInput" value={input} onChange={e => setInput(e.target.value)} />
//           </label>
//           <div>
//           <button>
//             Submit!
//           </button>
//           </div>
//         </form>

//       </div>
//       <p className="read-the-docs">
//         Time until page self-destructs:
//       </p>
//       <p id="timer">
//       60 seconds
//       </p>
//       </div>
//     </>
//   )
// }

// export default App
