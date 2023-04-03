import React, { useState } from "react";

const Input = ({ onSendMessage }) => {
  const [text, setText] = useState("");
  const onChange = (e) => {
    setText(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (text.trim() !== "") {
      onSendMessage(text);
    }
    setText("");
  };

  return (
    <div className="Input">
      <form onSubmit={(e) => onSubmit(e)}>
        <input
          onChange={(e) => onChange(e)}
          value={text}
          type="text"
          placeholder="Upiši poruku i pritisni ENTER"
          autoFocus={true}
        />
        <button>Pošalji</button>
      </form>
    </div>
  );
};
export default Input;
