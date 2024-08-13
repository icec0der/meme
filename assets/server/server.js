const express = require('express');
const cors = require('cors'); 
const { getBalance } = require('./index.js');

const app = express();
const port = 3000;

app.use(cors({
    origin: 'http://127.0.0.1:5500' 
}));

app.get('/api/balance', (req, res) => {
    const balance = getBalance();
    res.json({ balance });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
