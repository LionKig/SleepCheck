import { MongoClient } from 'mongodb';
import path from 'path';

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import './initializeDB';
import { authenticationRoute } from './authenticate'

import { connectDB } from './connectDB'
import { addNewTime, deleteTime, updateTime } from './communicate-db';

require('dotenv').config()

var cron = require('node-cron');

let port = process.env.PORT || 8888;
let app = express();

app.use(
    cors(),
    bodyParser.urlencoded({ extended: true }),
    bodyParser.json()
);

/*
var task = cron.schedule('0 0 * * *', async () => {
    let db = await connectDB();
    let collection = db.collection(`indexofday`);

    var indexday = new Date().getFullYear().toString() + (new Date().getMonth() + 1).toString() + new Date().getDate().toString();
        
});
*/

app.listen(port, () => {
    console.info("Server running, listening on port ", port);
    //task.start();
});

app.post('/getallvalues', async (req, res) => {

    let db = await connectDB();

    let sleeptimes = await db.collection(`sleeptimes`).find().toArray();
    let users = await db.collection(`users`).find().toArray();

    res.send({ sleeptimes, users });
});


authenticationRoute(app);

if (process.env.NODE_ENV == `production`) {
    app.use(express.static(path.resolve(__dirname, '../../dist')));
    app.get('/*', (req, res) => {
        res.sendFile(path.resolve('index.html'));
    });
}

app.post('/sleeptime/new', async (req, res) => {
    await addNewTime(req.body.sleeptime);
    res.status(200).send();
});

app.post('/sleeptime/delete', async (req, res) => {
    let db = await connectDB();
    await deleteTime(req.body.timeid);
    res.status(200).send();
});