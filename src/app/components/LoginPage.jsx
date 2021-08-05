import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { useState } from 'react';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { TextField } from '@material-ui/core';

const useRowStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

function createData(name, total, sleeptimes) {
    return {
        name,
        total,
        history: sleeptimes
    };
}

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="center">{row.total}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                History
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Start Time</TableCell>
                                        <TableCell>End Time</TableCell>
                                        <TableCell align="right">Amount</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.history.map((historyRow) => (
                                        <TableRow key={historyRow.id}>
                                            <TableCell component="th" scope="row">
                                                {historyRow.sttime}
                                            </TableCell>
                                            <TableCell>{historyRow.entime}</TableCell>
                                            <TableCell align="right">
                                                {(Number(historyRow.tottime)-(Number(historyRow.tottime)%60))/60}h {Number(historyRow.tottime)%60} min
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        name: PropTypes.string.isRequired,
        total: PropTypes.string.isRequired,
        history: PropTypes.arrayOf(
            PropTypes.shape({
                //amount: PropTypes.string.isRequired,
                entime: PropTypes.string.isRequired,
                sttime: PropTypes.string.isRequired,
            }),
        ).isRequired,
    }).isRequired,
};




const url = process.env.NODE_ENV === 'production' ? `` : `http://localhost:8888`;

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
                        // reset login status     
        this.state = {
            articleId: null,
        };

    }

    componentDidMount() {
        // POST request using axios with async/await
        //const article = { title: 'React POST Request Example' };
        const article = null;
        axios.post(url + '/getallvalues', { article })
            .then(response => {
                this.setState({ articleId: response });
            })
            .catch(error => {
                this.setState({ errorMessage: error.message });
                console.error('There was an error!', error);
            });
        //this.setState({ articleId: response.data.id });
    }

    render() {

        var indexday ;

        if ( this.props.filterdate == null ){
            indexday = new Date().getFullYear().toString() + (new Date().getMonth() + 1).toString() + new Date().getDate().toString();
        }else {
            indexday = this.props.filterdate ;
        }        
       

        const rows = Array();
        if (this.state.articleId !== null) {
            for (let user in this.state.articleId.data.users) {

                var userfiltersleeptimes = this.state.articleId.data.sleeptimes.filter(sleeptime => sleeptime.userid === this.state.articleId.data.users[user].id);
                var dayfiltersleeptimes = userfiltersleeptimes.filter(sleeptime => Number(sleeptime.dayindex) === Number(indexday));

                var totsum = 0;

                for (let id in dayfiltersleeptimes) {
                    totsum += Number(dayfiltersleeptimes[id].tottime);
                }

                rows.push(createData(this.state.articleId.data.users[user].name, (((totsum - totsum % 60) / 60).toString() + "h " + (totsum % 60).toString() + "m"), dayfiltersleeptimes));
            }
        }

        return (
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>People Name</TableCell>
                            <TableCell align="center">TotalTime</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.length > 0 ? rows.map((row) => (
                            <Row key={row.name} row={row} />
                        )) : null}
                    </TableBody>
                </Table>
            </TableContainer>

        );
    }
};



export default LoginPage;