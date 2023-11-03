const express = require('express');
const db = require('./dbConfig'); // Importez la configuration de la base de données
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'POST');
    next();
});

app.post('/login', async (req, res) => {
    const { username, email } = req.body;

    const sql = 'INSERT INTO utilisateur (username, email) VALUES (?, ?)';
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

    const sql = 'SELECT * FROM utilisateur WHERE id = ?';
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

app.listen(port, '0.0.0.0', () => {
    console.log(`Example app listening on port ${port}`);
});
