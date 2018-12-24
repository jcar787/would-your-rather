import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  IconButton,
  Typography,
  Button,
  Toolbar,
  AppBar,
  LinearProgress
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import MenuUI from '@material-ui/core/Menu';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import withStyles from '@material-ui/core/styles/withStyles';
import { logoutAction } from '../../features/user/loginActions';

const styles = {
  root: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'space-around'
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  username: {
    marginRight: 20
  },
  link: {
    textDecoration: 'none',
    color: '#fff',
    fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"',
    fontWeight: '500',
    lineHeight: '1.5',
    borderRadius: '4px',
    letterSpacing: '0.02857em',
    textTransform: 'uppercase'
  }
};

class Menu extends Component {
  constructor(props) {
    super(props);
    const { title } = this.props;
    const menuItems = [
      { name: 'Home', to: '/' },
      { name: 'Leaderboard', to: '/leaderboard' },
      { name: 'Register', to: '/register' }
    ];
    this.state = {
      menuItems: menuItems.filter(({ name }) => name !== title),
      anchorEl: null,
      menuOpen: false
    };
  }

  logout = e => {
    e.preventDefault();
    if (e.currentTarget.textContent === 'Logout') {
      const { dispatch } = this.props;
      dispatch(logoutAction());
    } else {
      const { history } = this.props;
      history.push('/login');
    }
  };

  handleClose = e => {
    e.preventDefault();
    this.setState({
      menuOpen: false,
      anchorEl: null
    });
  };

  onClick = e => {
    e.preventDefault();
    const { menuOpen } = this.state;

    this.setState({
      menuOpen: !menuOpen,
      anchorEl: e.currentTarget
    });
  };

  render() {
    const { title, classes, isLogged, username, loading } = this.props;
    const { menuItems: items, menuOpen, anchorEl } = this.state;
    return (
      <div className="root">
        <AppBar>
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={this.onClick}
            >
              <MenuIcon />
            </IconButton>
            <MenuUI
              id="mainMenu"
              open={menuOpen}
              onClose={this.handleClose}
              anchorEl={anchorEl}
            >
              <MenuList>
                {items.map(item => (
                  <Link key={item.name} to={item.to}>
                    <MenuItem>{item.name}</MenuItem>
                  </Link>
                ))}
              </MenuList>
            </MenuUI>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              {title}
            </Typography>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              {username}
            </Typography>
            {isLogged ? (
              <Button color="inherit" onClick={this.logout}>
                Logout
              </Button>
            ) : title === 'Register' ? (
              <Link to="/login" className={classes.link}>
                <Button color="inherit">Login</Button>
              </Link>
            ) : (
              <Link to="/register" className={classes.link}>
                <Button color="inherit">Register</Button>
              </Link>
            )}
          </Toolbar>
          {!loading && <LinearProgress color="secondary" />}
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const authedUser = state.login.authedUser ? state.login.authedUser : null;
  const isLogged = authedUser ? true : false;
  const username = authedUser ? authedUser.username : '';
  return {
    username,
    isLogged
  };
};

export default connect(mapStateToProps)(withStyles(styles)(Menu));
