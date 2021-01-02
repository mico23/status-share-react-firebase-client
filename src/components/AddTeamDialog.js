import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { GithubPicker } from 'react-color';

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
import Grid from '@material-ui/core/Grid';

// Redux stuff
import { connect } from 'react-redux';
import { addTeam } from '../redux/actions/teamsActions';

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
        height: 400
    },
    memo: {
        marginTop: 30
    },
    otherText: {
        marginTop: 8
    },
    colorPicker: {
        marginTop: 20
    }
};

export class AddTeamDialog extends Component {
    state = {
        open: false,
        team: "",
        priority: "",
        color: "#1a237e",
        col1: "Name",
        col2: "Present",
        col3: "Status"
    };
    
    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const newTeamData = {
            team: this.state.team.trim(),
            priority: parseInt( this.state.priority.trim() ),
            color: this.state.color.trim(),
            col1: this.state.col1.trim(),
            col2: this.state.col2.trim(),
            col3: this.state.col3.trim()
        };
        this.props.addTeam(newTeamData);
        this.handleClose();
        this.setState({
            open: false,
            team: "",
            priority: "",
            color: "",
            col1: "Name",
            col2: "Present",
            col3: "Status"
        });
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleColorChange = (color) => {
        this.setState({
            color: color.hex
        })
    };

    render() {
        const { classes, teamName } = this.props;
        return (
            <Fragment>
                <IconButton onClick={this.handleOpen} size="small" style={{ color: '#ffffff' }}>
                    <AddIcon />
                </IconButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="xs">
                    <IconButton onClick={this.handleClose} className={classes.closeButton} size="small">
                        <CloseIcon />
                    </IconButton>
                    <DialogTitle>
                        Add a new team
                    </DialogTitle>
                    <form>
                    <DialogContent className={classes.dialogContent}>
                        <TextField
                            id="team"
                            name="team"
                            type="team"
                            label="Team Name"
                            value={this.state.team}
                            onChange={this.handleChange}
                            className={classes.otherText}
                            fullWidth
                        />
                        <Grid container justify="center" className={classes.colorPicker}>
                        <Grid item>
                            <GithubPicker 
                                color={ this.state.color }
                                onChange={this.handleColorChange}/>
                        </Grid>
                        </Grid>
                        <TextField
                            id="priority"
                            name="priority"
                            type="priority"
                            label="Priority (e.g. 1)"
                            value={this.state.priority}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            id="col1"
                            name="col1"
                            type="col1"
                            label="Col 1 Header"
                            value={this.state.col1}
                            onChange={this.handleChange}
                            fullWidth
                            style={{ marginTop: '9px' }}
                        />
                        <TextField
                            id="col2"
                            name="col2"
                            type="col2"
                            label="Col 2 Header"
                            value={this.state.col2}
                            onChange={this.handleChange}
                            fullWidth
                            style={{ marginTop: '9px' }}
                        />
                        <TextField
                            id="col3"
                            name="col3"
                            type="col3"
                            label="Col 3 Header"
                            value={this.state.col3}
                            onChange={this.handleChange}
                            fullWidth
                            style={{ marginTop: '9px' }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleSubmit} variant="outlined" color="secondary" type="submit">
                            <AddIcon className={classes.icon}/>create team
                        </Button>
                    </DialogActions>
                    </form>
                </Dialog>
            </Fragment>
        )
    };
}

const mapStateToProps = (state) => ({
});

const mapActionsToProps = {
    addTeam
};

AddTeamDialog.propTypes = {
    addUser: PropTypes.func.isRequired,
    teamName: PropTypes.string.isRequired,
    teamCode: PropTypes.string.isRequired
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(AddTeamDialog));
