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

const styles = theme => ({
  card: {
    marginTop: 10,
    minWidth: 275,
    maxWidth: 500,
    width:500,
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
      justifyContent: 'center'
  },
  ButtonContent: {
    display:'flex',
    justifyContent: 'center',
    marginTop:10
},
menuTitle: {
  minWidth: 275,
  maxWidth: 800,
  width:800,
  flexWrap: 'wrap',
  marginLeft:'24px',
  marginRight:'24px',
},
});



class MenuWrite extends Component {

  saveMenu(){
    if(this.state.mode == "write"){
      axios.post('/api/menus/add',{
        name: this.state.menuName,
        description: this.state.menuDescription,
        BGColor: this.state.BGColor.r+','+this.state.BGColor.g+','+this.state.BGColor.b+','+this.state.BGColor.a,
        fontColor: +this.state.FontColor.r+','+this.state.FontColor.g+','+this.state.FontColor.b+','+this.state.FontColor.a,
      })
      .then( response => { console.log(response);
          } );
    }else if(this.state.mode == "modify"){
      axios.put('/api/menus/modify',{
        id: this.props.match.params.menuid,
        name: this.state.menuName,
        description: this.state.menuDescription,
        BGColor: this.state.BGColor.r+','+this.state.BGColor.g+','+this.state.BGColor.b+','+this.state.BGColor.a,
        fontColor: this.state.FontColor.r+','+this.state.FontColor.g+','+this.state.FontColor.b+','+this.state.FontColor.a,
      })
      .then( response => { console.log(response);
          } );
    }
  }

  deleteMenu(){
    axios.delete('/api/menus/delete/'+this.props.match.params.menuid)
    .then( response => { console.log(response);
        } );
  }


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
        r: '0',
        g: '0',
        b: '0',
        a: '1',
      },
      mode:''
    };

    this.UpdateBGColor = this.UpdateBGColor.bind(this);
    this.UpdateFontColor = this.UpdateFontColor.bind(this);
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
    if(this.props.match.params.menuid == undefined){
      this.setState({
        mode:'write',
        menuName:'Sample',
        menuDescription:'Sample',
      });
    }else{
      this.setState({
        mode:'modify'
      });
      this.getMenu(this.props.match.params.menuid);
    }
  }

  componentWillReceiveProps(nextprop){
    if(nextprop.match.params.menuid == undefined){
      this.setState({
        mode:'write',
        menuName:'Sample',
        menuDescription:'Sample',
      });
    }else{
      this.setState({
        mode:'modify'
      });
      this.getMenu(nextprop.match.params.menuid);
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  UpdateBGColor(color){
    this.setState({
      BGColor: color
  });
  }

  UpdateFontColor(color){
    this.setState({
      FontColor: color
  });
  }

  
  render() {
    const { classes } = this.props;

    let deleteButton = null;
    if (this.state.mode == 'modify') {
      deleteButton = <Button variant="contained" color="primary" onClick={() => this.deleteMenu()} style={{marginLeft:5}}>
      삭제
      </Button>;
    } 

    return (
      <Fragment>
      <div style={{ background: `rgba(${ this.state.BGColor.r }, ${ this.state.BGColor.g }, ${ this.state.BGColor.b }, ${ this.state.BGColor.a })`, paddingTop:80}}>
      <div className={classes.Content}>
        <div className={classes.menuTitle}><Typography style={{color: `rgba(${ this.state.FontColor.r }, ${ this.state.FontColor.g }, ${ this.state.FontColor.b }, ${ this.state.FontColor.a })`}} variant="h4" gutterBottom>{this.state.menuName}</Typography>
        <Typography style={{color: `rgba(${ this.state.FontColor.r }, ${ this.state.FontColor.g }, ${ this.state.FontColor.b }, ${ this.state.FontColor.a })`}} variant="subtitle1" gutterBottom>{this.state.menuDescription}</Typography></div>
        </div>
      </div>
    <div className={classes.Content}>
        <Card className={classes.card}>
          <CardContent>
        <TextField
          id="outlined-full-width"
          label="메뉴 이름"
          placeholder="메뉴 이름을 입력해 주세요."
          fullWidth
          margin="normal"
          variant="outlined"
          value={this.state.menuName}
          onChange={this.handleChange('menuName')}
        />
        <TextField
          id="outlined-full-width"
          label="메뉴 설명"
          placeholder="메뉴 설명을 입력해 주세요."
          fullWidth
          margin="normal"
          variant="outlined"
          value={this.state.menuDescription}
          onChange={this.handleChange('menuDescription')}
        />
        <ColorPicker onUpdate={this.UpdateBGColor} initColor={this.state.BGColor}/>
        <ColorPicker onUpdate={this.UpdateFontColor} initColor={this.state.FontColor}/>
          <div className={classes.ButtonContent}>
           <Button variant="contained" color="primary" onClick={() => this.saveMenu()}>
        저장
        </Button>
        {deleteButton}
        </div>
          </CardContent>
        </Card>
     </div>
     </Fragment>
    );
  }
}



export default withStyles(styles)(MenuWrite);