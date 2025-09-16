require('dotenv').config();
const apiKey = process.env.OPENAI_API_KEY;
const express = require('express');
const axios = require('axios');
require('dotenv').config();
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userMessage }]
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const reply = response.data.choices[0].message.content;
        res.json({ reply });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong." });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
