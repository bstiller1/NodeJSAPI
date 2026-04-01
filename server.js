const express = require('express');
const mysql = require('mysql2');
const app = express();
const cors = require('cors');
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'api_demo'
});

// API key
const API_KEY = '4876yi8576563457j4';
// Middleware Function
const checkApiKey = (req, res, next) => {
    const userKey = req.headers['x-api-key'];
    if (userKey === API_KEY) {
        next();
    } else {
        res.status(403).json({ error: "Forbidden: Invalid API KEY" });
    }
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// add users
app.post('/node/users', checkApiKey, (req, res) => {
    const { name, email } = req.body;
    const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
    db.query(sql, [name, email], (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({
            message: 'User created via NodeJS',
            id: result.insertId
        });
    });
});
// Get all users
app.get('/node/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json({ source: 'NodeJS', data: results });
    });
});
// Delete users
app.delete('/node/users/:id', checkApiKey, (req, res) => {
    const userId = req.params.id;
    const sql = 'DELETE FROM users WHERE id = ?';

    db.query(sql, [userId], (err, result) => {
        if (err) return res.status(500).json({ error: "Delete failed" });
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json({ message: `User ${userId} deleted via NodeJS` });
    });
});

app.listen(3000, () => console.log('Node API running on: http://localhost:3000'));