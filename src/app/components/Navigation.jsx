import { connect } from 'react-redux';
import React from 'react';
import * as mutations from '../store/mutations';
import AppBar from '@material-ui/core/AppBar';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { ConnectedDashboard } from './Dashboard';
import { CalendarToday } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));


const Navigation = ({ id, authenticated }) => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <div>
                <CssBaseline />
                <AppBar position="relative">
                    <Toolbar>
                        <Link to="/"><CalendarToday className={classes.icon} /></Link>
                        <Typography variant="h6" color="inherit" noWrap>
                            Welcome Time Schedule
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>

        </React.Fragment>
    );
}

const mapStateToProps = ({ session }) => (
    //console.log("Navigatin", session),
    {
        id: session.id,
        authenticated: session.authenticated == mutations.AUTHENTICATED
    }
);

export const ConnectedNavigation = connect(mapStateToProps)(Navigation);