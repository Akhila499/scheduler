import { useState } from "react";

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  function transition(newmode, replace = false){
    const newHistory = [...history];
    if(!replace){
      //adding new change to the state
      newHistory.push(newmode);
    } 
    setHistory(newHistory)
    //setmode to the new change
    setMode(newmode);
    
  }
  function back(){
    if(history.length > 1){

      //deleting the last entry from the history array and storing the remaining history array
      const deleteHistory = [...history];
      deleteHistory.pop();
      setHistory(deleteHistory);
      const last = deleteHistory.length - 1
      //set mode to the last value of the history
      setMode(deleteHistory[last]);
      

    }

  }
  return { mode, transition, back };
}