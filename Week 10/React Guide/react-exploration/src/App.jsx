
import { useState, useEffect } from "react";

function WelcomeMessage(props) {
  return <h2>Welcome, {props.name}!</h2>;
}

function App() {
  const [name, setName] = useState("");
  const [greeting, setGreeting] = useState("");

  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Count: ${count}`;

    console.log("Count changed:", count);
  }, [count]);

  function handleChange(event) {
    setName(event.target.value);
  }

  function handleClick() {
    setGreeting(`Hello, ${name}!`);
  }

  return (
    <div>
      <h1>My React Website</h1>

      <WelcomeMessage name="Sierra" />

      <h1>Event Handling</h1>

      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={handleChange}
      />

      <button onClick={handleClick}>
        Greet Me
      </button>

      <p>{greeting}</p>
    
      <h1>useEffect Example</h1>

      <p>Count: {count}</p>

      <button onClick={() => setCount(count + 1)}>
        Increase Count
      </button>
      <button onClick={() => setCount(count - 1)}>
        Decrease Count
      </button>
    </div>
  );
}

export default App;
