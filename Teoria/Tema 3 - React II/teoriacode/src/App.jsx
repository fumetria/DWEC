import React, { Component } from "react";
import ClickButton from "./ClickButton";
import Form from "./Form";
import SyntheticEvents from "./SyntheticEvents";
import InlineHandlers from "./InlineHandlers";
import UseStateExample from "./UseStateExample";
import ConditionalRendering from "./ConditionalRendering";

const App = () => {
  const handleChange = (event) => {
    console.log("Event Type: ", event.type);
    console.log("Event ID: ", event.target.id);
    console.log("Event Targe Value: ", event.target.value);
  };
  return (
    <>
      <div>
        <input
          type="text"
          onChange={handleChange}
          placeholder="Type something..."
          id="name"
        />
      </div>
      <ClickButton />
      <Form />
      <SyntheticEvents />
      <InlineHandlers />
      <UseStateExample />
      <ConditionalRendering />
    </>
  );
};

export default App;
