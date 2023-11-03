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

app.post('/login', async (req, res) => {
    try {
        // Lire les données existantes
        let data = [];
        try {
            const fileContents = await fs.readFile(dataFilePath, 'utf-8');
            data = JSON.parse(fileContents);
        } catch (error) {
            console.error('Error reading data file: ', error);
        }

        // Ajouter les nouvelles données
        data.push(req.body);

        // Écrire les données mises à jour dans le fichier
        await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');

        res.json({ message: 'Document successfully written!' });
    } catch (error) {
        console.error('Error writing document: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, '192.168.2.1', () => {
    console.log(`Example app listening on port ${port}`);
});
