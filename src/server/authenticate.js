import uuid from 'uuid';
import md5 from 'md5';
import { connectDB } from './connectDB'
import { assembleUserState } from './utility';

const authenticationTokens = [];


export const authenticationRoute = app => {
    app.post('/authenticate', async (req, res) => {
        let { username, password } = req.body;
        let db = await connectDB();
        let collection = db.collection(`users`);

        let user = await collection.findOne({ name: username });
        if (!user) {
            return res.status(500).send(`User not found`);
        }

        let hash = (password);
        let passwordCorrect = hash === user.password;
        if (!passwordCorrect) {
            return res.status(500).send('Password incorrect');
        }

        let token = uuid();

        authenticationTokens.push({
            token,
            userID: user.id
        });

        let state = await assembleUserState(user);

        res.send({ token, state });
    });

    app.post('/user/create', async (req, res) => {
        let { username, password } = req.body;
        let db = await connectDB();
        let collection = db.collection(`users`);
        let user = await collection.findOne({ name: username });
        if (user) {
            res.status(500).send({ message: "A user with that account name already exists." });
            return;
        };

        let userID = uuid();

        await collection.insertOne({
            name: username,
            id: userID,
            password: (password)
        });


        let state = await assembleUserState({ id: userID, name: username });

        res.status(200).send({ userID, state });
    });
};