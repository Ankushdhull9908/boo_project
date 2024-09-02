const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3103;

const crypto = require('crypto');

// Generate a random secret key
const secretKey = crypto.randomBytes(32).toString('hex');
console.log('Generated Secret Key:', secretKey);

// Sample user data (replace with your database)
const users = [
    { id: 1, username: 'user1', password: 'password1' } // Password: password1
];

// Middleware to parse JSON bodies

//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
app.use(bodyParser.json());

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    // Find user by username
    const user = users.find(user => user.username === username);
    if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Check password
    bcrypt.compare(password, user.password, (err, result) => {
        if (err || !result) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });

        // Send token as response
        res.json({ token });
    });
});

// Protected route
app.get('/protected', authenticateUser, (req, res) => {
    res.json({ message: 'Protected route' });
});

// Middleware to authenticate user using JWT token
function authenticateUser(req, res, next) {
    // Extract token from Authorization header
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Token missing' });
    }

    // Verify token
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        // Store user ID in request for subsequent middleware or routes
        req.userId = decoded.userId;
        next();
    });
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
