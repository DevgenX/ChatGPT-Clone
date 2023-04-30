import { useEffect, useState } from "react";

const App = () => {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);
  const [title, setTitle] = useState("");

  const handleCreateChat = () => {
    setMessage("");
    setInput("");
    setTitle("");
  };

  const handleClick = (titles) => {
    setTitle(titles);
    setMessage("");
    setInput("");
  };

  const getMessages = async () => {
    const config = {
      method: "POST",
      body: JSON.stringify({
        message: input,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch("http://localhost:8000/completions", config);

      const data = await response.json();

      setMessage(data.choices[0].message);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!title && input && message) {
      setTitle(input);
    }

    if (title && input && message) {
      setHistory((prev) => [
        ...prev,
        {
          title,
          role: "You",
          content: input,
        },
        {
          title,
          role: "Response",
          content: message.content,
        },
      ]);
    }
  }, [message, title, input]);

  const filteredTitles = history.filter((prev) => prev.title === title);
  const uniqueTitles = Array.from(new Set(history.map((prev) => prev.title)));

  return (
    <div className="app">
      <section className="side-bar">
        <button onClick={handleCreateChat}>+ New chat</button>
        <ul className="history">
          {uniqueTitles?.map((titles, index) => (
            <li onClick={() => handleClick(titles)} key={index}>
              {titles}
            </li>
          ))}
        </ul>
        <nav>
          <p>Made by DevGenX</p>
        </nav>
      </section>
      <section className="main">
        {!title && <h1>Idiot GPT</h1>}
        <ul className="feed">
          {filteredTitles?.map((chats, index) => (
            <li key={index}>
              <p className="role">{chats.role}: </p>
              <p className="message">{chats.content}</p>
            </li>
          ))}
        </ul>
        <div className="bottom-section">
          <div className="input-container">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <div id="submit" onClick={getMessages}>
              ➣
            </div>
          </div>
          <p className="info">
            This application uses ChatGPT Mar 14 Version. Note that this is just
            a clone of the GPT model and use it at your own discretion.
          </p>
        </div>
      </section>
    </div>
  );
};

export default App;
