import { Store, createStore, applyMiddleware, combineReducers } from "redux";
import { createLogger } from "redux-logger";
import { testData } from '../../server/testData';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

//import * as sagas from './sagas.mock';
import * as sagas from './sagas';
import * as mutations from './mutations';

export const store = createStore(
    combineReducers({
        session(userSession = testData.sessions || {}, action) {          
            let { type, authenticated } = action;
            
            switch (type) {
                case mutations.SET_STATE:                   
                    return { ...userSession, id: action.state.session.id };
                case mutations.REQUEST_AUTHENTICATE_USER:
                    return { ...userSession, authenticated: mutations.AUTHENTICATING };
                case mutations.PROCESSING_AUTHENTICATE_USER:
                    return { ...userSession, authenticated };
                default:
                    return userSession;
            }  
        },
        sleeptimes(sleeptimes = testData.sleeptimes, action) {             
            switch (action.type) {
                case mutations.SET_STATE:
                    return action.state.sleeptimes ;
                case mutations.CREATE_TIME:
                    return [...sleeptimes, {
                        id: action.timeid,
                        sttime: action.stime,
                        entime: action.etime,
                        userid: action.userid,
                        tottime: action.tottime
                    }];
                case mutations.DELETE_TIME:
                    sleeptimes = sleeptimes.filter(sleeptime => sleeptime.id !== action.timeid);
                    return sleeptimes;
            }
            return sleeptimes;
        },
        users(users = testData.users, action) {                  
            switch (action.type) {
                case mutations.SET_STATE:
                    return action.state.users ;               
            }         
            return users ;   
        }
    }),
    applyMiddleware(createLogger(), sagaMiddleware)
);

for (let saga in sagas) {
    sagaMiddleware.run(sagas[saga]);
}


/*
*/