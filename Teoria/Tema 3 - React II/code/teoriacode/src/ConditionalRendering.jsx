import React, { useState } from "react";

function ConditionalRendering() {
  const [showMessage, setShowMessage] = useState(false);

  const handleClick = () => setShowMessage(!showMessage);

  return (
    <div>
      <h3>Conditional Rendering</h3>
      <button onClick={handleClick}>
        {showMessage ? "Hide Message" : "Show Message"}
      </button>
      {showMessage && <p>This is a toggled message!</p>}
    </div>
  );
}

export default ConditionalRendering;
