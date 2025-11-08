const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 3000;
const SECRET_KEY = 'mock_secret_key';

// In-memory user storage
const users = [];

function generateToken(email) {
    return jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
}

app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    console.log('🆕 Signup Request:', req.body);

    const existing = users.find(u => u.email === email);
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const newUser = { name, email, password };
    users.push(newUser);

    const token = generateToken(email);
    res.json({ token });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log('🔐 Login Request:', req.body);

    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken(email);
    res.json({ token });
});

app.get('/profile', (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'Missing token' });

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        res.json({ message: 'Access granted', user: decoded });
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Mock Auth API running on http://localhost:${PORT}`);
});
