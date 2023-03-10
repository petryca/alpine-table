require('dotenv').config();
const express = require('express');
const app = express();
const api = require('./api');

app.use(express.json());
app.use('/api', api);

app.use(express.static('app'));

app.listen(process.env.PORT, () => {
    console.log(`server on port ${process.env.PORT}`)
});