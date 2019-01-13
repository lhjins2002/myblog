import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { modifyPage } from '../actions';

const styles = {
  list: {
    width: 250,
  },
  Link:{
    textDecoration:'none',
  }
};

class LeftMenu extends React.Component {

  state = {menus: []};

  getMenus(){
    axios.get('/api/menus')
    .then( response => { console.log(response);
        this.setState({
            menus: response.data
        }); } );
  }

  componentDidMount(){
    this.getMenus();
  }

  onClickMenu(menuid){
    this.props.onModifyPage(0, menuid)
  }

  render() {
    const { classes } = this.props;
    const list = this.state.menus.map(
        menu => (<Link to={'/'+this.props.userid+'/ItemList/'+ menu.id} className={classes.Link} >
        <ListItem button>
        <ListItemText key={menu.id} primary={menu.name} onClick={() => this.onClickMenu(menu.id)} />
        </ListItem>
        </Link>)
      );
    
    return (
        <div className={classes.list}>
        <List component="nav">
        <Link to={'/'+this.props.userid+'/ItemList'} className={classes.Link}>
            <ListItem button>
                <ListItemIcon>
                    <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
            </ListItem>
            </Link>
        </List>
        <Divider />
        <List component="nav">
        {list}
        <Link to={'/'+this.props.userid+'/MenuWrite'} className={classes.Link}>
        <ListItem button>
                <ListItemIcon>
                    <AddIcon />
                </ListItemIcon>
                <ListItemText secondary="새 메뉴 만들기" />
            </ListItem>
        </Link>
        </List>
        
      </div>
    );
  }
}

LeftMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

let mapDispatchToProps = (dispatch) => {
  return {
    onModifyPage: (pageType, value) => dispatch(modifyPage(pageType, value))
  };
}

LeftMenu = connect(undefined, mapDispatchToProps)(LeftMenu);

export default withStyles(styles)(LeftMenu);
