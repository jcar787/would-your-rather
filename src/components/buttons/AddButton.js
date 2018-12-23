import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuUI from '@material-ui/core/Menu';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import AddIcon from '@material-ui/icons/Add';

function TabContainer(props) {
  const { children, dir } = props;

  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
    position: 'absolute',
    minHeight: 200,
    bottom: 0,
    right: 0
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 3,
    right: theme.spacing.unit * 3
  }
});

class FloatingActionButtonZoom extends React.Component {
  state = {
    menuOpen: false,
    anchorEl: null
  };

  onClick = e => {
    e.preventDefault();
    const { menuOpen } = this.state;

    this.setState({
      menuOpen: !menuOpen,
      anchorEl: e.currentTarget
    });
  };

  handleClose = e => {
    this.setState({
      menuOpen: false,
      anchorEl: null
    });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl, menuOpen } = this.state;

    const fab = {
      color: 'primary',
      className: classes.fab,
      icon: <AddIcon />
    };

    return (
      <div className={classes.root}>
        <MenuUI
          id="mainMenu"
          open={menuOpen}
          onClose={this.handleClose}
          anchorEl={anchorEl}
        >
          <MenuList>
            <Link to="/add">
              <MenuItem>Add New Question</MenuItem>
            </Link>
          </MenuList>
        </MenuUI>
        <Button
          variant="fab"
          className={fab.className}
          color={fab.color}
          onClick={this.onClick}
        >
          {fab.icon}
        </Button>
      </div>
    );
  }
}

FloatingActionButtonZoom.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(
  FloatingActionButtonZoom
);
