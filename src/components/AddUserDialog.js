import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

// MUI components
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';

// Redux stuff
import { connect } from 'react-redux';
import { addUser } from '../redux/actions/dataActions';

const styles = {
    closeButton: {
        textAlign: 'center',
        position: 'absolute',
        left: '90%',
        marginTop: 7
    },
    icon: {
        margin: 'auto 5px auto auto'
    },
    dialogContent: {
        textAlign: 'center',
        height: 250
    },
    memo: {
        marginTop: 30
    },
    otherText: {
        marginTop: 8
    }
};

export class AddUserDialog extends Component {
    state = {
        open: false,
        name: "",
        email: "",
        phone: "",
        team: "",
        teamId: "",
        priority: ""
    }
    
    handleOpen = () => {
        this.setState({ open: true, team: this.props.teamName, teamId: this.props.teamId });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const newUserData = {
            name: this.state.name.trim(),
            email: this.state.email.trim(),
            phone: this.state.phone.trim(),
            team: this.state.team.trim(),
            teamId: this.state.teamId.trim(),
            priority: parseInt( this.state.priority.trim() )
        };
        this.props.addUser(newUserData);
        this.handleClose();
        this.setState({
            open: false,
            name: "",
            email: "",
            phone: "",
            team: "",
            teamId: "",
            priority: ""
        });
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render() {
        const { classes, teamName } = this.props;
        return (
            <Fragment>
                <IconButton onClick={this.handleOpen} size="small">
                    <AddIcon />
                </IconButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="xs">
                    <IconButton onClick={this.handleClose} className={classes.closeButton} size="small">
                        <CloseIcon />
                    </IconButton>
                    <DialogTitle>
                        Add new user to {teamName}
                    </DialogTitle>
                    <form>
                    <DialogContent className={classes.dialogContent}>
                        <TextField
                            id="name"
                            name="name"
                            type="name"
                            label="Name"
                            value={this.state.name}
                            onChange={this.handleChange}
                            className={classes.otherText}
                            fullWidth
                        />
                        <TextField
                            id="email"
                            name="email"
                            type="email"
                            label="Email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            className={classes.otherText}
                            fullWidth
                        />
                        <TextField
                            id="phone"
                            name="phone"
                            type="phone"
                            label="Phone"
                            value={this.state.phone}
                            onChange={this.handleChange}
                            className={classes.otherText}
                            fullWidth
                        />
                         <TextField
                            id="priority"
                            name="priority"
                            type="priority"
                            label="Priority (e.g. 1)"
                            value={this.state.priority}
                            onChange={this.handleChange}
                            className={classes.otherText}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleSubmit} variant="outlined" color="secondary" type="submit">
                            <AddIcon className={classes.icon}/>create user
                        </Button>
                    </DialogActions>
                    </form>
                </Dialog>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
})

const mapActionsToProps = {
    addUser
}

AddUserDialog.propTypes = {
    addUser: PropTypes.func.isRequired,
    teamName: PropTypes.string.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(AddUserDialog));