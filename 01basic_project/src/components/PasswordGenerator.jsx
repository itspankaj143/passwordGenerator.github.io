import { useRef } from "react";
import { useCallback, useEffect, useState } from "react";

const PasswordGenerator = () => {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}()~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordtoClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 9);

    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <h1>Password Generator</h1>
      <div className="gen">
        <input
          type="text"
          value={password}
          ref={passwordRef}
          placeholder="password"
          readOnly
          name=""
          id=""
        />
        <button className="btn" onClick={copyPasswordtoClipboard}>
          Copy
        </button>
      </div>
      <div className="demo">
        <input
          type="range"
          min={6}
          onChange={(e) => {
            setLength(e.target.value);
          }}
          max={100}
          value={length}
          name=""
          id=""
        />
        <label htmlFor="">Lenght: {length}</label>
      </div>
      <div className="demo">
        <input
          type="checkbox"
          defaultChecked={numberAllowed}
          onChange={() => {
            setNumberAllowed((prev) => !prev);
          }}
          name=""
          id=""
        />

        <label htmlFor="">Numbers</label>
      </div>
      <div className="demo">
        <input
          type="checkbox"
          defaultChecked={charAllowed}
          onChange={() => {
            setCharAllowed((prev) => !prev);
          }}
          name=""
          id=""
        />

        <label htmlFor="">Characters</label>
      </div>
    </>
  );
};

export default PasswordGenerator;
