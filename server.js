const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Enable CORS so your phone can access the server
app.use(cors());

// Parse JSON bodies
app.use(bodyParser.json());

// Define the homepage route
app.get('/', (req, res) => {
    res.send('JARVIS server is running!');
});

// Example chat endpoint
app.post('/chat', (req, res) => {
    const message = req.body.message;
    res.json({ reply: `You said: ${message}` });
});

// Start the server
aapp.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://192.168.31.81:${PORT}`);
});
