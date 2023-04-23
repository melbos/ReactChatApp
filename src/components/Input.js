import { useState } from "react";

const Input = ({ onSendMessage }) => {
  const [text, setText] = useState("");
  const [characterCount, setCharacterCount] = useState(0);
  const [error, showError] = useState(false);

  const onChange = (e) => {
    const characterCount = text.length;
    const error = characterCount > 160;

    setCharacterCount(characterCount);
    showError(error);

    setText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (characterCount <= 160) {
      if (text.trim() !== "") {
        onSendMessage(text);
      }
      setText("");
      setCharacterCount(0);
      showError(false);
    } else {
      showError(true);
    }
  };

  return (
    <div className="Input">
      <form onSubmit={(e) => onSubmit(e)}>
        <input
          onChange={(e) => onChange(e)}
          value={text}
          type="text"
          placeholder="Upiši poruku max duljine 160 znakova i pritisni ENTER"
          autoFocus={true}
          maxLength="160"
        />
        <button>Pošalji</button>
      </form>

      {error && (
        <div className="error">Poruka može sadržavati 160 znakova!</div>
      )}
    </div>
  );
};
export default Input;
