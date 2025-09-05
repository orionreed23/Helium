const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Absolute paths
const frontendPath = path.join(__dirname, '../frontend');
const htmlPath = path.join(frontendPath, 'html');
const accountsFile = path.join(__dirname, 'data', 'accounts.json');

// Serve static files (CSS, JS, assets)
app.use(express.static(frontendPath));

// === Routes for HTML pages ===

// Root → index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(htmlPath, 'index.html'));
});

// Explicit routes for other HTML pages
app.get('/login', (req, res) => {
    res.sendFile(path.join(htmlPath, 'login.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(htmlPath, 'sign-up.html'));
});

app.get('/forgot-password', (req, res) => {
    res.sendFile(path.join(htmlPath, 'forgot-password.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(htmlPath, 'dashboard.html'));
});

// === LOGIN API ===
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    fs.readFile(accountsFile, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ success: false, message: 'Server error.' });

        let accounts;
        try {
            accounts = JSON.parse(data);
        } catch {
            return res.status(500).json({ success: false, message: 'Invalid accounts data.' });
        }

        const user = accounts.find(
            acc => acc.email.toLowerCase() === email.toLowerCase() && acc.password === password
        );

        if (user) {
            return res.json({
                success: true,
                message: 'Login successful',
                user: {
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName
                }
            });
        }

        res.status(401).json({ success: false, message: 'Invalid email or password.' });
    });
});

// === SIGNUP API ===
app.post('/api/signup', (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    if (!email || !password || !firstName) {
        return res.status(400).json({ success: false, message: 'First name, email, and password are required.' });
    }

    fs.readFile(accountsFile, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ success: false, message: 'Server error.' });

        let accounts = [];
        try { accounts = JSON.parse(data); } catch {}

        const exists = accounts.some(acc => acc.email.toLowerCase() === email.toLowerCase());
        if (exists) return res.status(400).json({ success: false, message: 'Email already registered.' });

        accounts.push({ firstName, lastName, email, password });

        fs.writeFile(accountsFile, JSON.stringify(accounts, null, 2), err => {
            if (err) return res.status(500).json({ success: false, message: 'Could not save account.' });
            res.json({ success: true, message: 'Account created successfully.' });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
