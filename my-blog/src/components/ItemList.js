import React, { Component, Fragment } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import { Link } from 'react-router-dom';
import MenuTitle from './MenuTitle';
import ItemContent from './ItemContent';

const styles = {
  card: {
    marginTop: 10,
    minWidth: 275,
    maxWidth: 800,
    width:800,
    flexWrap: 'wrap',
  },
  menu: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  Content: {
      display:'flex',
      flexWrap: 'wrap',
      justifyContent: 'center'
  },
  AddButton: {
    marginTop: 10,
    flexWrap: 'wrap',
  },
  Link:{
    textDecoration:'none',
  }
};

class ItemList extends Component {

  state = {items: []};

  getItems(menuid){
    axios.get('/api/items/'+menuid)
    .then( response => { console.log(response);
        this.setState({
          items: response.data
        }); } );
  }

  componentDidMount(){
    this.getItems(this.props.match.params.menuid);
  }

  componentWillReceiveProps(nextprop){
    this.getItems(nextprop.match.params.menuid);
  }


  onClickMenu(itemId, menuid){
    this.props.onModifyPage(1, itemId)
  }

  openItemWrite(){
    
  }
  
  render() {
    const regex = /(<([^>]+)>)/ig;
    const { classes } = this.props;
    const list = this.state.items.map(
        item => (<Card key={item.id} className={classes.card}>
            <CardContent>
              <Typography variant="headline" component="h2">
                {item.name}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
              2018년 11월 28일
              </Typography>
                {item.content.replace(regex, '')}
            </CardContent>
            <CardActions>
            <Link to={'/'+this.props.match.params.userid+'/ItemContent/'+ item.id} className={classes.Link}>
              <Button size="small" color="primary" >
                더 보기
              </Button>
              </Link>
            </CardActions>
          </Card>)
      );

    return (
      <Fragment>
        <MenuTitle menuid={this.props.match.params.menuid} userid={this.props.match.params.userid} />
      <div className={classes.Content}>
      <Link to={'/'+this.props.match.params.userid+'/ItemWrite/'+ this.props.match.params.menuid}>
      <Button mini color="secondary" variant="fab" aria-label="Add" className={classes.AddButton}>
        <AddIcon />
      </Button>
      </Link>
      </div>
      <div className={classes.Content}>
        {list}
      </div>
      </Fragment>
    );
  }
}

ItemList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ItemList);