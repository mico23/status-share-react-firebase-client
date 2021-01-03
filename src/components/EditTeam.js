import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { GithubPicker } from 'react-color';

// MUI components
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import SendIcon from '@material-ui/icons/Send';
import Grid from '@material-ui/core/Grid';

// Redux stuff
import { connect } from 'react-redux';
import { updateTeam, deleteTeam } from '../redux/actions/teamsActions';

const styles = {
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
        height: 400
    },
    textField: {
        margin: '10px 20px auto 20px'
    }
};

export class EditTeam extends Component {
    state = {
        open: false,
        team: "",
        priority: "",
        color: "",
        col1: "Name",
        col2: "Present",
        col3: "Status"
    };
    
    handleOpen = () => {
        this.setState({ 
            open: true,
            team: this.props.teamsFields.team,
            priority: this.props.teamsFields.priority.toString(10),
            color: this.props.teamsFields.color,
            col1: this.props.teamsFields.col1,
            col2: this.props.teamsFields.col2,
            col3: this.props.teamsFields.col3
        });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const teamData = {
            prevTeam: this.props.teamsFields.team,
            team: this.state.team,
            priority: parseInt( this.state.priority ),
            color: this.state.color,
            col1: this.state.col1,
            col2: this.state.col2,
            col3: this.state.col3
        };
        this.props.updateTeam(this.props.teamsFields.teamId, teamData);
        this.handleClose();
    };
    
    handleDelete = (event) => {
        event.preventDefault();
        this.props.deleteTeam(this.props.teamsFields.teamId, this.props.teamsFields.team);
        this.handleClose();
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
        const { classes, teamsFields } = this.props;

        const dialogMarkup = 
            <>
            <DialogTitle>Edit {teamsFields.team}</DialogTitle>
            <form>
            <DialogContent className={classes.dialogContent}>
                <Grid container justify="center">
                <Grid item>
                <TextField 
                    id="team"
                    name="team"
                    type="team"
                    label="Team Name"
                    placeholder={teamsFields.team}
                    value={this.state.team}
                    onChange={this.handleChange}
                    className={classes.textField}
                    />
                </Grid>
                <Grid item style={{ marginTop: 15 }}>
                <GithubPicker 
                    color={ this.state.color }
                    onChange={this.handleColorChange}/>
                </Grid>
                <Grid item>
                <TextField 
                    id="priority"
                    name="priority"
                    type="priority"
                    label="Priority"
                    placeholder={teamsFields.priority.toString(10)}
                    value={this.state.priority}
                    onChange={this.handleChange}
                    className={classes.textField}
                    />
                </Grid>
                <Grid item>
                <TextField 
                    id="col1"
                    name="col1"
                    type="col1"
                    label="Col 1 Header"
                    placeholder={teamsFields.col1}
                    value={this.state.col1}
                    onChange={this.handleChange}
                    className={classes.textField}
                    />
                </Grid>
                <Grid item>
                <TextField 
                    id="col2"
                    name="col2"
                    type="col2"
                    label="Col 2 Header"
                    placeholder={teamsFields.col2}
                    value={this.state.col2}
                    onChange={this.handleChange}
                    className={classes.textField}
                    />
                </Grid>
                <Grid item>
                <TextField 
                    id="col3"
                    name="col3"
                    type="col3"
                    label="Col 3 Header"
                    placeholder={teamsFields.col3}
                    value={this.state.col3}
                    onChange={this.handleChange}
                    className={classes.textField}
                    />
                </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button style={{ color: '#ef5350' }} variant="outlined" onClick={this.handleDelete}>
                        <DeleteIcon className={classes.icon}/>delete team
                </Button>
                <Button variant="outlined" color="secondary" onClick={this.handleSubmit} type="submit">
                    <SendIcon className={classes.icon}/>edit team
                </Button>
            </DialogActions>
            </form>
            </>

        return (
            <Fragment>
                <IconButton onClick={this.handleOpen} size="small">
                    <EditIcon/>
                </IconButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="xs">
                    <IconButton onClick={this.handleClose} className={classes.closeButton} size="small">
                        <CloseIcon />
                    </IconButton>
                    {dialogMarkup}
                </Dialog>
            </Fragment>
        )
    };
}

const mapActionsToProps = {
    updateTeam,
    deleteTeam
};

EditTeam.propTypes = {
    deleteTeam: PropTypes.func.isRequired,
    teamsFields: PropTypes.object.isRequired,
    updateTeam: PropTypes.func.isRequired
};

export default connect(null, mapActionsToProps)(withStyles(styles)(EditTeam));
