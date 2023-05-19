const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

const API_KEY = process.env.API_KEY;
const API_BASE_URL = 'https://api.football-data.org/v4';

router.get('/matches', (req, res) => {
    axios.get(`${API_BASE_URL}/matches`, {
        headers: { 'X-Auth-Token': API_KEY }
    })
    .then(response => {
        res.render('home', { matches: response.data.matches });
    })
    .catch(error => {
        console.error('Error fetching data: ', error);
        res.status(500).send('Error fetching data');
    });
});

module.exports = router;
