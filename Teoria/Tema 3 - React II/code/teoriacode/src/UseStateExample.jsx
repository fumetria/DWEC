import React, { useState } from "react";

function Counter() {
  //     STATE   SETSTATE   INITIALVALUE
  const [count, setCount] = useState(0);
  return (
    <div>
      <h3>useState Example</h3>
      <p>Current Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default Counter;
