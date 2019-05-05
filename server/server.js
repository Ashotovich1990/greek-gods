const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const db = require('../keys/secret.js').MONGO_URI;
const models = require('./models.js');
const path = require('path');
const cors = require('cors');

const app = express();

if (!db) {
    throw new Error('You must provide a string to connect to mLab');
}

app.use(cors());
app.use(express.static('frontend/public'));
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../','frontend', 'public', 'index.html'));
})

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));

app.use(bodyParser.json());

const expressGraphQL = require('express-graphql');

const schema = require('./schema/schema.js')

app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true
}));

module.exports = app;