import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import LeftMenu from './LeftMenu';
import { Link } from 'react-router-dom';


const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
    cursor: 'pointer'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  Link:{
    textDecoration:'none',
    color:'white'
  }
};

class TopBar extends React.Component {

    state = {open: false,};
    
    toggleDrawer = (open) => () => {
        this.setState({
            open: open,
        });
    };

  render() {
    const { classes } = this.props;

    return (
    <div className={classes.root}>
      <AppBar position="absolute" >
        <Toolbar>
          <IconButton className={classes.menuButton} color="default" aria-label="Menu" onClick={this.toggleDrawer(true)}>
            <MenuIcon  />
            </IconButton>
            <Drawer open={this.state.open} onClose={this.toggleDrawer(false)}>
                <div
                    tabIndex={0}
                    role="button"
                    onClick={this.toggleDrawer(false)}
                    onKeyDown={this.toggleDrawer(false)}
                >
                    <LeftMenu />
                </div>
            </Drawer>
          
          <Typography variant="title" color="inherit" className={classes.flex}>
            User
          </Typography>
          <Link to='/login' className={classes.Link}>
          <Button color="inherit">Login</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
    );
  }
}

TopBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TopBar);
