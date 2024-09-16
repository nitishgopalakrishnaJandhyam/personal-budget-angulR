// Budget API
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const budgetModel = require('./Models/budgetData');

app.use(cors());
app.use(bodyParser.json());
app.use('/', express.static("public"));

const MONGODB_URI = "mongodb://localhost:27017/budgetApp";

mongoose.connect(MONGODB_URI)
.then(() => {
    console.log("Connected to Database");
}).catch((err) => {
    console.log("Unable to connect to Database.\n", err);
})

const budgetEntries = [
    { title: 'rent', budget: 10000, color: '#ff6666' },
    { title: 'sports clubs', budget: 5000, color: '#4da6ff' },
    { title: 'utilities', budget: 15000, color: '#2eb82e' },
    { title: 'games', budget: 1500, color: '#33ffff' },
    { title: 'food', budget: 8000, color: '#ffb31a' },
    { title: 'health', budget: 2000, color: '#ff33ff' },
];
budgetModel.insertMany(budgetEntries)
    .then(() => {
        console.log('Multiple budget entries added successfully!');
    })
    .catch(err => {
        console.error('Error inserting multiple budget entries:', err.message);
    });

app.get("/expenses", async (req, res) => {
    await budgetModel.find().then((data) => {
        res.json(data);
    }).catch((connectionError) => {
        console.error(connectionError);
        res.status(400).json({error:'Internal Server Error'})
    });
})

app.post('/expenses', async (req, res) => {
    const newItem = new budgetModel(req.body);
    await newItem.save().then((data) => {
        res.json(data);
    }).catch((connectionError) => {
        console.error(connectionError);
        res.status(400).json({error: connectionError.message})
    });
})

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`)
})