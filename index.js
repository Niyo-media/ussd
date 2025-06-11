const express = require('express');
const bodyParser = require('body-parser');
const PORT = 3000;

const app = express();

// ✅ Middleware to parse incoming POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/ussd', (req, res) => {
    // Check if req.body exists
    if (!req.body) {
        return res.status(400).send('Missing request body');
    }

    const {
        sessionId,
        serviceCode,
        phoneNumber,
        text,
    } = req.body;

    let response = '';

    if (!text || text === '') {
        // First menu
        response = `CON What would you like to check\n1. My account\n2. My phone number`;
    } else if (text === '1') {
        response = `CON Choose account information you want to view\n1. Account number`;
    } else if (text === '2') {
        response = `END Your phone number is ${phoneNumber}`;
    } else if (text === '1*1') {
        const accountNumber = 'ACC100101';
        response = `END Your account number is ${accountNumber}`;
    } else {
        // Fallback for any other input
        response = `END Invalid input. Please try again.`;
    }

    res.set('Content-Type', 'text/plain');
    res.send(response);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
