const express = require('express');
const messageSchema = require('../models/message')

const app = express();
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', '*');
    next();
});

app.get('/', async (req, res) => {
    const messages = await messageSchema.find();

    if (messages) {
        res.status(200).json(messages);
    } else {
        res.status(404).json({error: 'No messages found'});
    }
});

app.post('/', async (req, res) => {
    const {text, date, user, username} = req.body;
    const message = new messageSchema({text, date, user, username});

    const savedMessage = await message.save();
    if (savedMessage) {
        res.status(201).json({message: 'Message saved'});
    }
    else {
        res.status(400).json({error: 'Message not saved'});
    }

});

module.exports = app;


