import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { testData } from './testData';
import { connectDB } from './connectDB';
//import {addNewTime , deleteTime } from './communicate-db' ;

let port = 8888;
let app = express();

const authorizationTokens = [];
app.listen( port , console.log("server listening on port ", port ) ) ;

app.use(
    cors(),
    bodyParser.urlencoded({ extended: true }),
    bodyParser.json()
);

app.post(`/sleeptime/new`, (req, res) => {
    let { task } = req.body;
    await addNewTime( task ) ;
    res.status(200).send();
});

app.post(`/sleeptime/delete`, (req, res) => {
    let { sleeptime } = req.body;
    await deleteTime( sleeptime ) ;
    res.status(200).send();
});

app.get('/user/:id', (req, res) => {
    let user = testData.users.find(user => user.id === req.params.id);
    if (!user) {
        res.status(500).send();
    } else {
        res.json(user);
    }
});