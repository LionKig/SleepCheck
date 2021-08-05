export const REQUEST_TIME_CREATION = `REQUEST_TIME_CREATION`;
export const CREATE_TIME = `CREATE_TIME`;
export const REQUEST_AUTHENTICATE_USER = `REQUEST_AUTHENTICATE_USER`;
export const PROCESSING_AUTHENTICATE_USER = `PROCESSING_AUTHENTICATE_USER`;
export const AUTHENTICATING = `AUTHENTICATING`;
export const AUTHENTICATED = `AUTHENTICATED`;
export const NOT_AUTHENTICATED = `NOT_AUTHENTICATED`;
export const SET_STATE = `SET_STATE`;
export const USERNAME_RESERVED = `USERNAME_RESERVED`;
export const REQUEST_USER_ACCOUNT_CREATION = `REQUEST_USER_ACCOUNT_CREATION`;
export const DELETE_TIME = `DELETE_TIME`;
export const REQUEST_TIME_DELETE = `REQUEST_TIME_DELETE`;
export const FORM_LOAD= `FORM_LOAD` ;

export const requestTimedelete = (timeid) => ({
    type: REQUEST_TIME_DELETE,
    timeid
});

export const requestTimeCreation = (userid, stime, etime, tottime, indexday) => ({
    type: REQUEST_TIME_CREATION,
    userid,
    stime,
    etime,
    tottime,
    indexday
});

export const createTime = (timeid, userid, stime, etime, tottime, dayindex ) => ({
    type: CREATE_TIME,
    timeid,
    userid,
    stime,
    etime,
    tottime,
    dayindex
});

export const deleteTime = (timeid) => ({
    type: DELETE_TIME,
    timeid
});


export const requestAuthenticateUser = (username, password) => ({
    type: REQUEST_AUTHENTICATE_USER,
    username,
    password
});

export const processAuthenticateUser = (status = AUTHENTICATING, session = null) => ({
    type: PROCESSING_AUTHENTICATE_USER,
    session,
    authenticated: status
});

export const setState = (state = {}) => ({
    type: SET_STATE,
    state
});


export const requestCreateUserAccount = (username, password) => ({
    type: REQUEST_USER_ACCOUNT_CREATION,
    username,
    password
});