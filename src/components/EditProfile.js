import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

// MUI components
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import SendIcon from '@material-ui/icons/Send';
import TextField from '@material-ui/core/TextField';

// Redux stuff
import { connect } from 'react-redux';
import { editProfile } from '../redux/actions/usersActions';

const styles = {
    closeButton: {
        textAlign: 'center',
        position: 'absolute',
        left: '92%',
        marginTop: 7
    },
    icon: {
        margin: 'auto 5px auto auto'
    },
    dialogContent: {
        textAlign: 'center',
        height: 280
    },
    memo: {
        marginTop: 30
    },
    otherText: {
        marginTop: 8
    },
    shortText: {
        marginTop: 8,
        marginRight: 15,
        width: 250
    }
};

export class EditProfile extends Component {
    state = {
        name: "",
        phone: "",
        email: "",
        team: "",
        memo: "",
        priority: "",
        open: false
    };

    handleOpen = () => {
        this.setState({ open: true });
        this.mapUserToState();
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    mapUserToState = () => {
        this.setState({
            name: this.props.user.name,
            phone: this.props.user.phone,
            email: this.props.user.email,
            team: this.props.user.team,
            memo: this.props.user.memo,
            priority: this.props.user.priority,
            userId: this.props.user.userId
        });
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const profileData = {
            name: this.state.name,
            phone: this.state.phone,
            email: this.state.email,
            team: this.state.team.trim(),
            memo: this.state.memo,
            userId: this.state.userId,
            priority: parseInt(this.state.priority)
        };
        this.props.editProfile(this.props.user.userId, profileData);
        this.handleClose();
    };

    render() {
        const { classes, user: { name, phone, email, memo, priority } } = this.props;
        return (
            <Fragment>
                <Button onClick={this.handleOpen} variant="outlined" color="secondary">
                    <EditIcon className={classes.icon}/>  edit
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <IconButton onClick={this.handleClose} className={classes.closeButton} size="small">
                        <CloseIcon />
                    </IconButton>
                    <DialogTitle>
                        Edit {name}'s profile
                    </DialogTitle>
                    <form>
                    <DialogContent className={classes.dialogContent}>
                        <Grid container>
                        <Grid item>
                        <TextField
                            id="phone"
                            name="phone"
                            type="phone"
                            label="Phone"
                            placeholder={phone}
                            value={this.state.phone}
                            onChange={this.handleChange}
                            className={classes.shortText}
                        />
                        </Grid>
                        <Grid item>
                        <TextField
                            id="email"
                            name="email"
                            type="email"
                            label="Email"
                            placeholder={email}
                            value={this.state.email}
                            onChange={this.handleChange}
                            className={classes.shortText}
                        />
                        </Grid>
                        </Grid>
                        <TextField
                            id="memo"
                            name="memo"
                            type="memo"
                            label="Memo"
                            variant="filled" 
                            multiline
                            rows="2"
                            placeholder={memo}
                            value={this.state.memo}
                            onChange={this.handleChange}
                            fullWidth
                            className={classes.memo}
                        />
                        {Boolean(parseInt(localStorage.admin)) && (
                            <>
                            <TextField
                            name="name"
                            label="Name"
                            placeholder={name}
                            value={this.state.name}
                            onChange={this.handleChange}
                            fullWidth
                            className={classes.otherText}
                            />
                            <TextField
                            id="priority"
                            name="priority"
                            type="priority"
                            label="Priority (e.g. 1)"
                            placeholder={priority}
                            value={this.state.priority}
                            onChange={this.handleChange}
                            fullWidth
                            className={classes.otherText}
                            />
                            </>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleSubmit} variant="outlined" color="secondary" type="submit">
                            <SendIcon className={classes.icon}/>submit
                        </Button>
                    </DialogActions>
                    </form>
                </Dialog>
            </Fragment>
        )
    };
}

const mapStateToProps = (state) => ({
    user: state.users.user
});

const mapActionsToProps = {
    editProfile
};

EditProfile.propTypes = {
    editProfile: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(EditProfile));
