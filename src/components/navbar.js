import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Components
import EditAppName from './EditAppName';
import AddTeamDialog from './AddTeamDialog';

// MUI components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import IconButton from '@material-ui/core/IconButton';

// Redux stuff
import { connect } from 'react-redux';
import { logoutUser, getAppName } from './src/redux/actions/accountActions';

export class Navbar extends Component {

    componentDidMount() {
        this.props.getAppName();
    }

    handleLogout = () => {
        this.props.logoutUser();
    }

    render() {
        const { authenticated, appName, admin } = this.props;
        return (
            <AppBar>
                <Toolbar variant="dense">
                    <Grid justify="space-between" container>
                        <Grid item>
                            <IconButton size="small">
                                <CheckCircleOutlineIcon style={{ color: '#ffffff' }}/>
                            </IconButton>
                            <Button color="inherit">
                                {appName}
                            </Button>
                            {(Boolean(parseInt(localStorage.admin)) || admin) && (<><EditAppName/><AddTeamDialog/></>)}
                        </Grid>
                        {authenticated && (
                                <Button onClick={this.handleLogout} color="inherit" variant="outlined" size="small" component={Link} to="/login">
                                    Sign Out
                                </Button>)}
                    </Grid>
                </Toolbar>
            </AppBar>
        )
    }
}

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    logoutUser: PropTypes.func.isRequired,
    getAppName: PropTypes.func.isRequired,
    appName: PropTypes.string.isRequired,
    admin: PropTypes.bool.isRequired
};
  
const mapStateToProps = (state) => ({
    authenticated: state.account.authenticated,
    admin: state.account.admin,
    appName: state.account.appName
});

const mapActionsToProps = {
    logoutUser,
    getAppName
}

export default connect(mapStateToProps, mapActionsToProps)(Navbar);
