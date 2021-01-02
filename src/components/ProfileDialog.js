import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';

// Components
import ProfileButton from './ProfileButton';
import EditProfile from './EditProfile';

// MUI components
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import GroupIcon from '@material-ui/icons/Group';
import Box from '@material-ui/core/Box';
import DeleteIcon from '@material-ui/icons/Delete';

// Redux stuff
import { connect } from 'react-redux';
import { getUser, deleteUser, clearErrors } from '../redux/actions/usersActions';

const styles = {
    spinnerDiv: {
        textAlign: 'center',
        marginTop: 15,
        marginBottom: 15
    },
    closeButton: {
        textAlign: 'center',
        position: 'absolute',
        left: '90%',
        marginTop: 7
    },
    icon: {
        margin: '5px 8px auto 15px'
    },
    statusText: {
        margin: '20px auto 0px 10px'
    },
    text2: {
        margin: '10px auto 0px 10px'
    },
    dialogContent: {
        height: 250
    },
    buttonIcon: {
        margin: 'auto 5px auto auto'
    }
};

export class ProfileDialog extends Component {
    state = {
        open: false
    };

    handleOpen = () => {
        this.setState({ open: true });
        this.props.getUser(this.props.userId);
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleDelete = () => {
        this.props.deleteUser(this.props.userId);
        this.handleClose();
    };

    render() {
        const { classes, user: { name, status, statusTime, phone, email, team, memo }, UI: { loading } } = this.props;

        const dialogMarkup = loading ? (
            <div>
            <DialogTitle>Loading...</DialogTitle>
            <DialogContent className={classes.dialogContent}>
            <div className={classes.spinnerDiv}>
                <CircularProgress size={80} thickness={2} />
            </div>
            </DialogContent>
            </div>
        ) : (
            <div>
            <DialogTitle>{name}</DialogTitle>
            <DialogContent className={classes.dialogContent}>
            <Grid container justify="flex-start">
                <Grid item>
                    <Grid container alignItems="center" justify="center">
                        <Grid item><PhoneIcon color="secondary" className={classes.icon}/></Grid>
                        <Grid item>
                            <Typography>{phone}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container alignItems="center" justify="center">
                        <Grid item><EmailIcon color="secondary" className={classes.icon}/></Grid>
                        <Grid item>
                            <Typography>{email}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container alignItems="center" justify="center">
                        <Grid item><GroupIcon color="secondary" className={classes.icon}/></Grid>
                        <Grid item>
                            <Typography>{capitalize(String(team))}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item>
                    <Typography className={classes.statusText}>
                        <Box fontWeight="fontWeightBold" m={1}>Status: </Box>
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography className={classes.statusText} noWrap>{status}</Typography>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item>
                    <Typography className={classes.text2}>
                        <Box fontWeight="fontWeightBold" m={1}>Since: </Box>
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography className={classes.text2}>{dayjs(statusTime).format('h:mm a, MMMM DD YYYY')}</Typography>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item>
                    <Typography className={classes.text2}>
                        <Box fontWeight="fontWeightBold" m={1}>Memo: </Box>
                    </Typography>
                </Grid>
                <Grid item>
        <Typography className={classes.text2}>{memo}</Typography>
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
            {Boolean(parseInt(localStorage.admin)) && (
                <Button onClick={this.handleDelete} style={{ color: '#ef5350' }} variant="outlined">
                    <DeleteIcon className={classes.buttonIcon}/>delete
                </Button>)}
            {!Boolean(parseInt(localStorage.viewOnly)) && (<EditProfile/>)}
        </DialogActions>
        </div>
        )

        return (
            <Fragment>
                <ProfileButton onClick={this.handleOpen} tip={this.props.userMemo} />
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <IconButton onClick={this.handleClose} className={classes.closeButton} size="small">
                        <CloseIcon />
                    </IconButton>
                    {dialogMarkup}
                </Dialog>
            </Fragment>
        )
    };
}

const mapStateToProps = (state) => ({
    user: state.users.user,
    UI: state.UI
});

const mapActionsToProps = {
    getUser,
    deleteUser,
    clearErrors
};

ProfileDialog.propTypes = {
    userId: PropTypes.string.isRequired,
};

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ProfileDialog));
