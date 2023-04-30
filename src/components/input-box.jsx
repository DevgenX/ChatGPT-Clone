const Input = ({ input, setInput, setMessage }) => {
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
  return (
    <>
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
          This application uses ChatGPT Mar 14 Version. Note that this is just a
          clone of the GPT model and use it at your own discretion.
        </p>
      </div>
    </>
  );
};
export default Input;
