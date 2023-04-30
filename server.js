const fetch = require("node-fetch");
const PORT = 8000;
const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const API_KEY = "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";

app.post("/completions", async (req, res) => {
  const config = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: req.body.message,
        },
      ],
      max_tokens: 100,
    }),
  };

  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      config
    );

    const data = await response.json();
    res.send(data);
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => console.log("Server is running on PORT " + PORT));
