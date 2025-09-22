import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from 'dotenv'; // Import the dotenv library

dotenv.config(); // Load environment variables from .env file

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // store safely in .env

app.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: question }]
      })
    });

    const data = await response.json();
    res.json({ answer: data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(5000, () => console.log("🚀 Jarvis backend running on port 5000"));
