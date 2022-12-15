require('dotenv').config();
const express = require('express');
var cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3000;

const corsOptions = {
    methods: ["GET", "PUT", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Set-Cookie"],
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.send('OK');
});

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});