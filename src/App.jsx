import { useReducer } from "react";
import "./App.css";
import Post from "./components/Post";

const INITIAL_STATE = 0;

// function stateReducer(state, action) {
function stateReducer(state, { type, payload }) {
  //? method 1:
  //? if (type === "inc") return state + payload;
  //? if (type === "dec") return state - payload;
  //? if (type === "reset") return INITIAL_STATE;

  // * better method for more action:
  switch (type) {
    case "inc": {
      return state + payload;
    }
    case "dec": {
      return state - payload;
    }
    case "reset": {
      return INITIAL_STATE;
    }
    default:
      return state;
  }
}

function App() {
  // 1:
  const [state, dispatch] = useReducer(stateReducer, INITIAL_STATE);

  // 2:
  const handleInc = () => {
    dispatch({ type: "inc", payload: 1 }); //! what action happen
  };

  const handleDec = () => {
    dispatch({ type: "dec", payload: 1 });
  };

  const handleReset = () => {
    dispatch({ type: "reset" });
  };

  return (
    <div>
      <p>count : {state}</p>
      <button onClick={handleInc}>+</button>
      <button onClick={handleReset}>Reset</button>
      <button onClick={handleDec}>-</button>
      <Post />
    </div>
  );
}

export default App;
