import React from "react";

const Form = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Form submitted!");
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Enter your name" />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
