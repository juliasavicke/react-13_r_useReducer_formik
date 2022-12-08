import { useReducer } from 'react';
import { useState, useEffect } from 'react';

const initCounter = { value: 0 };

function counterReducer(state, action) {
  console.log('action ===', action);

  switch (action.type) {
    case 'UP':
      return { value: state.value + 1 };
    case 'DOWN':
      return { value: state.value - 1 };
    case '10UP':
      return { value: state.value + action.payload };
    case 'RESET':
      return initCounter;
    default:
      throw new Error('tokio action nera');
  }
}

function Counter(props) {
  const [counterState, setCounterState] = useState(initCounter);

  const [state, dispatch] = useReducer(counterReducer, initCounter);

  function handleUp() {
    dispatch({ type: 'UP' });
  }
  function handleDown() {
    dispatch({ type: 'DOWN' });
  }
  function handle10Up(howmuch) {
    dispatch({ type: '10UP', payload: howmuch });
  }
  function handleReset() {
    dispatch({ type: 'RESET' });
  }

  //   function handleUp() {
  //     setCounterState((prevValue) => {
  //       return { value: prevValue.value + 1 };
  //     });
  // useEffect(() => {
  //   console.log('settimeout');
  //   setTimeout(() => {
  //     setCounterValue((prevValue) => prevValue + 1);
  //   }, 4000);
  // }, []);
  //   }
  //   function handleDown() {
  //     setCounterState((prevValue) => {
  //       return { value: prevValue.value - 1 };
  //     });
  //   }
  //   function handle10Up() {
  //     setCounterState((prevValue) => {
  //       return { value: prevValue.value + 10 };
  //     });
  //   }
  //   function handleReset() {
  //     setCounterState(initCounter);
  //   }

  return (
    <div className='card counter'>
      <p>Counter</p>
      <h2>{state.value}</h2>
      <div className='ctrl'>
        <button onClick={handleUp}>up</button>
        <button onClick={handleDown}>down</button>
        <button onClick={() => handle10Up(10)}>up by 10</button>
        <button onClick={handleReset}>reset</button>
      </div>
    </div>
  );
}
export default Counter;
