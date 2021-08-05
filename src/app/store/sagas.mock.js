import { take, put, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as mutations from './mutations';
import uuid from 'uuid';
import { history } from './history';
import { testData } from '../../server/testData';

/**
 * Reducers cannot have any randomness (the must be deterministic)
 * Since the action of creating a task involves generating a random ID, it is not pure.
 * When the response to an action is not deterministic in a Redux application, both Sagas and Thunks are appropriate.
 **/
export function* timeCreationSaga() {
    while (true) {
        const { userid, stime, etime } = yield take(mutations.REQUEST_TIME_CREATION);
        const id = uuid();
        //sttime = "" , entime = "" ;
        yield put(mutations.createTime(id, userid, stime, etime));
    }
}

export function* timeDeleteSaga() {
    while (true) {
        const { timeid } = yield take(mutations.REQUEST_TIME_DELETE);
        yield put(mutations.deleteTime(timeid));
    }
}

export function* userAuthenticationSaga(){
    while (true){
        const {username,password} = yield take(mutations.REQUEST_AUTHENTICATE_USER);

        let auth = null , id = null ;

        for( let user in testData.users ){
            if( testData.users[user].name === username && testData.users[user].password === password ){
                auth = mutations.AUTHENTICATED ;
                id = testData.users[user].id ;
            }
        }
        if( auth == null ) auth = mutations.NOT_AUTHENTICATED ;


        yield delay(250);
        yield put(mutations.processAuthenticateUser(auth, {
            id,
            token:"ABCD-1234",
        }));

        //history.push(`/dashboard`)
    }
}