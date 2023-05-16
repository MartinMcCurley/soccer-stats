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
        let data = response.data.matches;

        let output = '<table><tr><th>Home Team</th><th>Away Team</th><th>Status</th></tr>';

        for (let i = 0; i < data.length; i++) {
            output += `<tr><td>${data[i].homeTeam.name}</td><td>${data[i].awayTeam.name}</td><td>${data[i].status}</td></tr>`;
        }

        output += '</table>';

        res.send(output);
    })
    .catch(error => {
        console.error('Error fetching data: ', error);
        res.status(500).send('Error fetching data');
    });
});


module.exports = router;
