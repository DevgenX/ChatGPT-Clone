import { useEffect, useState } from "react";
import Input from "./components/input-box";
import Sidebar from "./components/sidebar";
import FeedBox from "./components/feed-box";

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
      <Sidebar
        handleCreateChat={handleCreateChat}
        uniqueTitles={uniqueTitles}
        handleClick={handleClick}
      />
      <section className="main">
        <FeedBox title={title} filteredTitles={filteredTitles} />
        <Input input={input} setInput={setInput} setMessage={setMessage} />
      </section>
    </div>
  );
};

export default App;
