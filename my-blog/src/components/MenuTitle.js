import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import ColorPicker from './ColorPicker';
import { Link } from 'react-router-dom';

const styles = theme => ({
  Content: {
      display:'flex',
      justifyContent: 'center'
  },
menuTitle: {
  minWidth: 275,
  maxWidth: 800,
  width:800,
  flexWrap: 'wrap',
  marginLeft:'24px',
  marginRight:'24px',
},
Link:{
  textDecoration:'none',
}
});



class MenuTitle extends Component {
  constructor(props){
    super(props);

    this.state = {
        menuName:'',
      menuDescription:'',
      BGColor:{
        r: '255',
        g: '255',
        b: '255',
        a: '1',
      },
      FontColor:{
        r: '255',
        g: '255',
        b: '255',
        a: '1',
      },
    };
}

getMenu(menuid){
    axios.get('/api/menus/'+menuid)
    .then( response => { console.log(response);
      if(response.data.length > 0){
        this.setState({
          menuName: response.data[0].name,
          menuDescription: response.data[0].description,
          BGColor: {r:response.data[0].BGColor.split(',')[0], g:response.data[0].BGColor.split(',')[1],
            b:response.data[0].BGColor.split(',')[2],a:response.data[0].BGColor.split(',')[3]},
          FontColor: {r:response.data[0].fontColor.split(',')[0], g:response.data[0].fontColor.split(',')[1],
            b:response.data[0].fontColor.split(',')[2],a:response.data[0].fontColor.split(',')[3]},
        });
     }
     } );
        
  }

  componentDidMount(){
      this.getMenu(this.props.menuid);
  }

  componentWillReceiveProps(nextprop){
    this.getMenu(nextprop.menuid);
  }
  
  render() {
    const { classes } = this.props;
    return (
      <div style={{ background: `rgba(${ this.state.BGColor.r }, ${ this.state.BGColor.g }, ${ this.state.BGColor.b }, ${ this.state.BGColor.a })`, paddingTop:80}}>
      <div className={classes.Content}>
        <div className={classes.menuTitle}><Typography style={{color: `rgba(${ this.state.FontColor.r }, ${ this.state.FontColor.g }, ${ this.state.FontColor.b }, ${ this.state.FontColor.a })`}} variant="h4" gutterBottom>{this.state.menuName}
        <Link to={'/'+this.props.userid+'/MenuWrite/'+this.props.menuid} className={classes.Link}>
        <Button color="secondary" >
        EDIT
      </Button></Link></Typography>
        <Typography style={{color: `rgba(${ this.state.FontColor.r }, ${ this.state.FontColor.g }, ${ this.state.FontColor.b }, ${ this.state.FontColor.a })`}} variant="subtitle1" gutterBottom>{this.state.menuDescription}</Typography></div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(MenuTitle);