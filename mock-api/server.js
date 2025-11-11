const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 3000;
const SECRET_KEY = 'mock_secret_key';

// 🧑‍⚕️ Predefined HMS users with roles
const users = [
    {
        name: 'Dr. Priya Sharma',
        email: 'doctor@example.com',
        password: '12345',
        role: 'doctor'
    },
    {
        name: 'Nurse Anita Roy',
        email: 'nurse@example.com',
        password: '12345',
        role: 'nurse'
    },
    {
        name: 'Receptionist Meena',
        email: 'receptionist@example.com',
        password: '12345',
        role: 'receptionist'
    },
    {
        name: 'Lab Technician Ravi',
        email: 'labtech@example.com',
        password: '12345',
        role: 'labtech'
    },
    {
        name: 'Pharmacist Kiran',
        email: 'pharmacist@example.com',
        password: '12345',
        role: 'pharmacist'
    },
    {
        name: 'Billing Executive Suresh',
        email: 'billing@example.com',
        password: '12345',
        role: 'billing'
    },
    {
        name: 'IT Admin Rohan',
        email: 'admin@example.com',
        password: '12345',
        role: 'admin'
    }
];

// New signups = patient (for Patient Portal tests)
function generateToken(user) {
    return jwt.sign(
        {
            email: user.email,
            role: user.role
        },
        SECRET_KEY,
        { expiresIn: '30m' }
    );
}

app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    console.log('🆕 Signup Request:', req.body);

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Name, email, password required' });
    }

    const existing = users.find(u => u.email === email);
    if (existing) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = {
        name,
        email,
        password,
        role: 'patient'
    };

    users.push(newUser);
    const token = generateToken(newUser);
    return res.json({ token });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log('🔐 Login Request:', req.body);

    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user);
    return res.json({ token });
});

function verifyAuth(req) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return { error: { status: 401, body: { message: 'Missing token' } } };
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return { error: { status: 401, body: { message: 'Missing token' } } };
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        return { decoded };
    } catch (err) {
        console.log('❌ Token verify failed:', err.message);
        return { error: { status: 401, body: { message: 'Token invalid or expired' } } };
    }
}

// Generic role helper for API-only 403 tests (optional)
function requireRole(decoded, allowedRoles) {
    if (!allowedRoles.includes(decoded.role)) {
        return { error: { status: 403, body: { message: 'Forbidden: insufficient role' } } };
    }
    return {};
}

// Used by Angular Dashboard
app.get('/profile', (req, res) => {
    const result = verifyAuth(req);
    if (result.error) return res.status(result.error.status).json(result.error.body);

    const decoded = result.decoded;

    return res.json({
        message: 'Profile fetched successfully',
        user: {
            email: decoded.email,
            role: decoded.role,
            iat: decoded.iat,
            exp: decoded.exp
        }
    });
});

// Simple protected admin test endpoint (not mandatory for UI)
app.get('/admin-data', (req, res) => {
    const result = verifyAuth(req);
    if (result.error) return res.status(result.error.status).json(result.error.body);

    const decoded = result.decoded;
    if (decoded.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden: Admins only' });
    }

    return res.json({ message: '👑 Secret admin data' });
});

app.listen(PORT, () => {
    console.log(`🚀 Mock Auth API running on http://localhost:${PORT}`);
    console.log('✅ Test users:');
    users.forEach(u => console.log(`- ${u.email} / ${u.password} [${u.role}]`));
});
