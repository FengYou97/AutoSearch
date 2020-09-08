// This Serves as a template with notes - Please review the Final post on GitHub for FULL requirements

// Server logic for creating a Node.js server.
// This should contain only the logic for setting up the server.
// Routes should be placed in a separate file and required in.

// Review the demo from Week 14

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 8888;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', '/client')));

const apiRoutes = require('./api/routes.js');
app.use('/api', apiRoutes);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});