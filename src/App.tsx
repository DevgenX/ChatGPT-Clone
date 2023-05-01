import { useEffect, useState } from "react";
import Input from "./components/input-box";
import Sidebar from "./components/sidebar";
import FeedBox from "./components/feed-box";

interface HistoryContent {
  title: string;
  role: string;
  content: string;
}

const App = () => {
  const [input, setInput] = useState<string>("");
  const [message, setMessage] = useState<HistoryContent>({
    title: "",
    role: "",
    content: "",
  });
  const [history, setHistory] = useState<HistoryContent[]>([]);
  const [title, setTitle] = useState("");

  const handleCreateChat = () => {
    setMessage({ title: "", role: "", content: "" });
    setInput("");
    setTitle("");
  };

  const handleClick = (titles: string) => {
    setTitle(titles);
    setMessage({ title: "", role: "", content: "" });
    setInput("");
  };

  useEffect(() => {
    if (!title && input && message.content) {
      setTitle(input);
    }

    if (title && input && message.content) {
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
