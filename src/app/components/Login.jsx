
import React, { useState } from 'react';
import * as mutations from '../store/mutations';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import LoginPage from './LoginPage';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { Container } from '@material-ui/core';
import { Timelapse } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        width: 'fit-content'
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    textdialog: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
}))

function SimpleDialog(props) {
    const classes = useStyles();
    const { onClose, open } = props;

    const [filterdate, setfilterdate] = useState("");

    const handleClose = () => {
        onClose();
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    const handlechange = (e) => {
        var indexday = new Date(e.target.value);
        var tempday = indexday.getFullYear().toString() + (indexday.getMonth() + 1).toString() + (indexday.getDate() + 1).toString();

        setfilterdate(tempday);
    }

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" fullWidth={true}
            maxWidth='md' open={open}>
            <DialogTitle id="form-dialog-title">Today's Sleep History</DialogTitle>
            <TextField
                type="date"
                InputLabelProps={{
                    shrink: true,
                }}
                id="stime"
                name="stime"
                onChange={handlechange}
                className={classes.textdialog}
            />
            <LoginPage filterdate={filterdate} />
        </Dialog>
    );
}

SimpleDialog.propTypes = {
};


const LoginComponent = ({ authenticateUser, authenticated }) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };
    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />

            <SimpleDialog open={open} onClose={handleClose} />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handleClickOpen}>
                            <Timelapse />
                        </Button>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={authenticateUser}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="User Name"
                            name="username"
                            autoComplete="username"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                        </Button>



                        {authenticated === mutations.NOT_AUTHENTICATED ?
                            <p>
                                Login incorrect.
                            </p> : null
                        }
                        <Link to="/signup">
                            Don't have an account? Sign up.
                        </Link>

                    </form>
                </div>
            </Grid>
        </Grid>
    );
}

const mapStateToProps = ({ session }) => ({
    authenticated: session.authenticated
});

const mapDispatchToProps = (dispatch) => ({
    authenticateUser(e) {
        e.preventDefault();
        let username = e.target[`username`].value;
        let password = e.target[`password`].value;
        dispatch(mutations.requestAuthenticateUser(username, password));
    }
});

export const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(LoginComponent);