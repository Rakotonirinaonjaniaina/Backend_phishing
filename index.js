const express = require('express');
const fs = require('fs/promises');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

const dataFilePath = path.join(__dirname, 'data.json');

app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'POST');
    next();
});

app.get('/user/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        // Lire les données existantes
        const fileContents = await fs.readFile(dataFilePath, 'utf-8');
        const data = JSON.parse(fileContents);

        // Trouver l'utilisateur par ID
        const user = data.find((u) => u.id === userId);

        if (!user) {
            res.status(404).json({ error: 'Utilisateur non trouvé' });
        } else {
            res.json(user);
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des données : ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Example app listening on port ${port}`);
});
