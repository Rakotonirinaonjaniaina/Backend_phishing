const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = process.env.PORT || 3000;

// Configurez la connexion à la base de données MySQL
const db = mysql.createConnection({
    host: 'localhost:5432', // Adresse de votre serveur MySQL
    user: 'postgres', // Nom d'utilisateur MySQL
    password: 'postgres', // Mot de passe MySQL
    database: 'express', // Nom de votre base de données MySQL
  });
  

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ', err);
  } else {
    console.log('Connected to MySQL database');
  }
});



app.post('/login', async (req, res) => {
    const { username, email } = req.body;

    const sql = 'INSERT INTO users (username, email) VALUES (?, ?)';
    const values = [username, email];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error writing to MySQL: ', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            console.log('Document successfully written to MySQL');
            res.json({ message: 'Document successfully written!' });
        }
    });
});


app.get('/user/:id', async (req, res) => {
    const userId = req.params.id;

    const sql = 'SELECT * FROM users WHERE id = ?';
    const values = [userId];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error retrieving data from MySQL: ', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (results.length === 0) {
                res.status(404).json({ error: 'Utilisateur non trouvé' });
            } else {
                res.json(results[0]);
            }
        }
    });
});
