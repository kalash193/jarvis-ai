import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // store safely in .env

// Add this new GET route to handle requests to the root URL
app.get("/", (req, res) => {
  res.send("🚀 Jarvis backend is up and running!");
});

app.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;

   const response = await fetch("https://api.openai.com/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: message }]
  })
});

    console.log("Sending request to OpenAI API...");
console.log("API Key loaded:", process.env.OPENAI_API_KEY ? "YES" : "NO");
console.log("Message:", message);

    res.json({ answer: data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(5000, () => console.log("🚀 Jarvis backend running on port 5000"));



