import React from 'react';
import { Typography } from '@material-ui/core';
import Menu from '../menu/Menu';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  flexing: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '50px'
  }
});

const NotFound = props => {
  const { classes, history } = props;
  return (
    <React.Fragment>
      <Menu title="Not Found" loading={true} history={history} />
      <div className={classes.flexing}>
        <Typography variant="h1">Not Found</Typography>
      </div>
      <div className={classes.flexing}>
        <Typography variant="h3">
          This is not the page you're looking for
        </Typography>
      </div>
      <div className={classes.flexing}>
        <img
          src="https://i.kym-cdn.com/photos/images/original/000/915/056/50e.jpg"
          alt="Not Found"
        />
      </div>
    </React.Fragment>
  );
};

export default withStyles(styles)(NotFound);
