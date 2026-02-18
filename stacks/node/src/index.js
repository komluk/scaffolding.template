const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const landingPage = fs.readFileSync(path.join(__dirname, '..', 'landing.html'), 'utf8');

app.get('/', (req, res) => {
    res.type('html').send(landingPage);
});

app.get('/health', (req, res) => {
    res.json({ status: 'healthy' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
