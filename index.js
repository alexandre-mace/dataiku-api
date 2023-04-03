const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.post('/predict', async (req, res) => {
    const features = req.body.features;
    const url = 'https://api-5a3176f1-afdb75f3-dku.eu-west-3.app.dataiku.io/public/api/v1/prixdesfermes/predict_valeur_fonciere/predict';

    try {
        const response = await axios.post(url, { features });
        const prediction = response.data;
        res.json(prediction);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});