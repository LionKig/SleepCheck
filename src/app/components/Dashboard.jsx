import React from 'react';
import { connect } from 'react-redux';
import { requestTimeCreation, requestTimedelete } from '../store/mutations';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, CssBaseline, TableBody, TableRow, TextField, TableCell, Table, TableHead } from '@material-ui/core';
import { Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';




const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    table: {
        border: `10px solid ${theme.palette.type === 'light' ? '#f0f0f0' : '#303030'}`,
        borderWidth: "1px",
        borderColor: "#aaaaaa",
        borderStyle: 'solid'
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '10%',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    fragment: {
        display: 'grid',
        justifyItems: 'center',
        alignContent: 'center'
    },
    margin: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    boxstyle: {
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        justifyItems: 'center',
        flexWrap: 'nowrap',
        flexDirection: 'row'
    }
}));


export const Dashboard = ({ sleeptimes, user, createNewTime, deleteTime }) => {

    const [ftime, setftime] = useState("2021-07-30T00:00");
    const [stime, setstime] = useState("2021-07-30T00:00");

    const classes = useStyles();

    function setFsTime(event) {
        setftime(event.target.value);
    }

    function setSeTime(event) {
        setstime(event.target.value);
    }


    return (
        <div className={classes.fragment}>
            <CssBaseline />
            <Box component="span" m={5} className={classes.boxstyle}>
                <TextField
                    type="datetime-local"
                    defaultValue="2021-07-30T00:00"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    id="sttime"
                    name="sttime"
                    onChange={setFsTime} />

                <TextField
                    type="datetime-local"
                    defaultValue="2021-07-30T00:00"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    id="entime"
                    name="entime"
                    onChange={setSeTime} />
                <Button variant="contained" size="small" color="primary" className={classes.margin} onClick={() => createNewTime(sleeptimes, user, ftime, stime)}>
                    Add
                </Button>
            </Box>
            <Table
                className={classes.table}
                size="small"
                aria-label="a dense table"
            >
                <TableHead>
                    <TableRow>
                        <TableCell align='center'>Start Time</TableCell>
                        <TableCell align='center'>End Time</TableCell>
                        <TableCell align='center'> Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sleeptimes.map(sleeptime => (
                        <TableRow key={sleeptime.id}>
                            <TableCell align='center'>{sleeptime.sttime}</TableCell>
                            <TableCell align='center'>{sleeptime.entime}</TableCell>
                            <TableCell align='center'>
                                <IconButton aria-label="delete" className={classes.margin} onClick={() => deleteTime(sleeptime.id)}>
                                    <DeleteIcon fontSize="large" />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {/*<Box component="span" m={5}>
                {sleeptimes.map(sleeptime => (
                    <div key={sleeptime.id}>
                        <TextField
                            type='text'
                            defaultValue={sleeptime.sttime}
                            variant='outlined'
                            inputProps={
                                { readOnly: true, }
                            }
                        />--TO--
                        <TextField
                            type='text'
                            defaultValue={sleeptime.entime}
                            variant='outlined'
                            inputProps={
                                { readOnly: true, }
                            }
                        />
                        <IconButton aria-label="delete" className={classes.margin} onClick={() => deleteTime(sleeptime.id)}>
                            <DeleteIcon fontSize="large" />
                        </IconButton>
                    </div>
                ))}
                        </Box>*/}

        </div>


    );
}

const mapStateToProps = (state, ownProps) => {
    var indexday = new Date().getFullYear().toString() + (new Date().getMonth() + 1).toString() + new Date().getDate().toString();
    return {
        sleeptimes: state.sleeptimes,
        user: state.users
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        createNewTime(sleeptimes, user, ftime, stime) {

            var stuser = sleeptimes.filter(u => (u.sttime) === (ftime));
            var enuser = sleeptimes.filter(u => (u.entime) === (stime));

            //console.log(stuser, enuser, ftime, stime);

            if (stime < ftime) {
                alert("You input wrong time.\n Please check it and fix it.");
            }else if( (stuser.length>0) || (enuser.length>0) ){
                alert("You input wrong time. \n There are same times in field. \n Please check it and fix this.");
            } else {
                var sdate = new Date(ftime);
                var edate = new Date(stime);
                var startdate = sdate.getFullYear()+sdate.getMonth()+sdate.getDate() ;
                var enddate= edate.getFullYear()+edate.getMonth()+edate.getDate() ;                

                var totdate = (edate - sdate) / (1000 * 60);
                var indexday = new Date().getFullYear().toString() + (new Date().getMonth() + 1).toString() + new Date().getDate().toString();

                dispatch(requestTimeCreation(user.id, ftime, stime, totdate, indexday));
/*
                if( startdate != indexday ){
                    alert("You input wrong time. Start Date is wrong.Please check it and fix it.");
                }else{}              */
            }
        },
        deleteTime(timeid) {
            dispatch(requestTimedelete(timeid));
        }
    }
}

export const ConnectedDashboard = connect(mapStateToProps, mapDispatchToProps)(Dashboard);

