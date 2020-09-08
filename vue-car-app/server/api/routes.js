// This Serves as a template with notes - Please review the Final post on GitHub for FULL requirements

// Create Routes for your Vue.js Application

// Use the express Router to create and GET and POST route
// Review the demo from Week 14

const carTypesModule = require('car-app');
const express = require('express');
const router = express.Router();

router.post('/search', async (req, res) => {
    try {
        const { name } = req.body;
        const manufacturer = await carTypesModule.find(name);

        res.json(manufacturer);
    } catch (err) {
        res.json(err);
    }
});

router.post('/fetch', async (req, res) => {
    try {
        const { id } = req.body;
        const fetchObject = await carTypesModule.fetch(id);

        res.json(fetchObject);
    } catch (err) {
        res.json(err);
    }
});

module.exports = router;