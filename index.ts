import express, { Application, Request, Response } from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app: Application = express();
const PORT: number = 8000;

app.use(express.json());
app.use(cors());

const API_KEY: string = process.env.API_KEY || "";

app.post("/completions", async (req: Request, res: Response) => {
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
    res.status(500).json({ error: "Server Error" });
  }
});

app.listen(PORT, () => console.log("Server is running on PORT " + PORT));
