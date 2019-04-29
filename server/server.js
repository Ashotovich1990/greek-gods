const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const db = require('../keys/secret.js').MONGO_URI;
const models = require('./models.js')

const app = express();

if (!db) {
    throw new Error('You must provide a string to connect to mLab');
}

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