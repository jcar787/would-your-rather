import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { registerAction } from './registerActions';
import { FormControl } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Menu } from '../../components/menu';

const styles = theme => {
  return {
    loginForm: {
      width: '420px',
      margin: '0 auto',
      zIndex: '99',
      display: 'block',
      marginTop: '5%',
      background: 'transparent',
      borderRadius: '.25em .25em .4em .4em',
      textAlign: 'center',
      boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)',
      color: ' #fff'
    },

    block: {
      display: 'block'
    },

    input: {
      margin: '25px auto 0 auto',
      width: '50%',
      padding: '15px 15px 0 0',
      display: 'block'
    },

    submitButton: {
      margin: '25px 0'
    }
  };
};
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      showErrorMessage: false
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleClick = e => {
    e.preventDefault();
    const { dispatch } = this.props;
    const { username, password, confirm } = this.state;

    if (password !== confirm) {
      alert('Password and Confirm Password are not the same');
    } else {
      dispatch(registerAction(username, password));
      this.setState({
        username: '',
        password: '',
        confirm: ''
      });
    }
  };

  render() {
    const { classes, loggedIn, loading } = this.props;

    if (loggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <React.Fragment>
        <Menu title="Register" loading={loading} />
        <div className={classes.loginForm}>
          <form>
            <FormControl className={classes.block}>
              <Input
                id="username"
                placeholder="Username"
                className={classes.input}
                onChange={e => this.handleChange(e)}
              />
            </FormControl>
            <FormControl className={classes.block}>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                className={classes.input}
                onChange={e => this.handleChange(e)}
              />
            </FormControl>
            <FormControl className={classes.block}>
              <Input
                id="confirm"
                type="password"
                placeholder="Confirm Password"
                className={classes.input}
                onChange={e => this.handleChange(e)}
              />
            </FormControl>
            <FormControl>
              <Button
                label="Submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={event => this.handleClick(event)}
                className={classes.submitButton}
              >
                Register
              </Button>
            </FormControl>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.login.authedUser ? true : false,
    loading: true
  };
};

export default connect(mapStateToProps)(withStyles(styles)(Login));
