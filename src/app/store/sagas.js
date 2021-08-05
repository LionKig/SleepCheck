import { take, put, select } from 'redux-saga/effects';
import uuid from 'uuid';
import axios from 'axios';

import { history } from './history'
import * as mutations from './mutations';
const url = process.env.NODE_ENV === 'production' ? `` : `http://localhost:8888`;

export function* timeCreationSaga() {
    while (true) {

        const { userid, stime, etime, tottime , indexday} = yield take(mutations.REQUEST_TIME_CREATION);
        
        const id = uuid();       

        //sttime = "" , entime = "" ;
        let mutation = mutations.createTime(id, userid, stime, etime, tottime, indexday);

        const { res } = yield axios.post(url + `/sleeptime/new`, {
            sleeptime: {
                id: id,
                sttime: stime,
                entime: etime,
                userid: userid,
                tottime: tottime,
                dayindex: indexday
            }
        });
        yield put(mutation);
        
    }
}

export function* timeDeleteSaga() {
    while (true) {
        const { timeid } = yield take(mutations.REQUEST_TIME_DELETE);
        axios.post(url + `/sleeptime/delete`, { timeid });        
        yield put(mutations.deleteTime(timeid));
    }
}

export function* userAuthenticationSaga() {
    while (true) {
        const { username, password } = yield take(mutations.REQUEST_AUTHENTICATE_USER);
        try {
            const { data } = yield axios.post(url + `/authenticate`, { username, password });

            yield put(mutations.setState(data.state));
            yield put(mutations.processAuthenticateUser(mutations.AUTHENTICATED));
            
            history.push(`/dashboard`);
        } catch (e) {

            yield put(mutations.processAuthenticateUser(mutations.NOT_AUTHENTICATED));
        }
    }
}


export function* userAccountCreationSaga() {
    while (true) {
        const { username, password } = yield take(mutations.REQUEST_USER_ACCOUNT_CREATION);
        try {
            const { data } = yield axios.post(url + `/user/create`, { username, password });               
            if( !data ) throw new Error() ; 

            yield put(mutations.setState({ ...data.state, session: { id: data.userID } }));
            yield put(mutations.processAuthenticateUser(mutations.AUTHENTICATED));

            history.push('/dashboard');

        } catch (e) {
            console.error("Error", e);
            yield put(mutations.processAuthenticateUser(mutations.NOT_AUTHENTICATED));
        }
    }
}