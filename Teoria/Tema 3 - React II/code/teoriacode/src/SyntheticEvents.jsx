import React from "react";

const SyntheticEvents = () => {
  const handleEvent = (event) => {
    if (event.type === "mouseenter") {
      console.log("Mouse entered!");
    } else if (event.type === "mouseleave") {
      console.log("Mouse left!");
    }
  };
  return (
    <div
      onMouseEnter={handleEvent}
      onMouseLeave={handleEvent}
      style={{ width: "200px", backgroundColor: "indigo", height: "100px" }}
    >
      Hover over me!
    </div>
  );
};

export default SyntheticEvents;
