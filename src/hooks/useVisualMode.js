
import { useState } from 'react';

export function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);

  const transition = function(mode, replace = false) {
    if (replace) {
      setHistory(prev => [...prev.slice(0, -1), mode]);
    } else {
      setHistory(prev => [...prev, mode]);
    }
  }

  const back = function () {
    setHistory(prev => {
      if (prev.length > 1) {
        return prev.slice(0, -1)
      }
      return prev
    })
  }

  return { mode: history[history.length -1], transition, back };
}


// import { useState } from "react";

// export function useVisualMode(initial) {
//   const [mode, setMode] = useState(initial);
//   const [history, setHistory] = useState([initial]);
//   function transition(newmode, replace = false){
//     const newHistory = [...history];
//     if(!replace){
//       //adding new change to the state
//       newHistory.push(newmode);
//       setHistory(newHistory)
//       // setMode(newmode);
       
//     } else {
//       setHistory(prev => [...prev.slice(0, -1), newmode])
//       // setMode(newmode);
//     }
    

//     //setmode to the new change
    
//   }
//   function back(){
//     if(history.length > 1){

//       //deleting the last entry from the history array and storing the remaining history array
//       const deleteHistory = [...history];
//       deleteHistory.pop();
//       setHistory(deleteHistory);
//       const last = deleteHistory.length - 1
//       //set mode to the last value of the history
//       setMode(deleteHistory[last]);
      

//     }

//   }
//   return { mode, transition, back };
// }







