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
      justifyContent: 'center',
      marginTop:80
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



class Login extends Component {

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
}


  componentDidMount(){
  }

  componentWillReceiveProps(nextprop){
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  
  render() {
    const { classes } = this.props;

    return (
      <Fragment>
    <div className={classes.Content}>
        <Card className={classes.card}>
          <CardContent>
        <TextField
          id="outlined-full-width"
          label="아이디"
          placeholder="블로그 주소로 쓰일 아이디를 입력해 주세요."
          fullWidth
          margin="normal"
          variant="outlined"
          value={this.state.menuName}
          onChange={this.handleChange('menuName')}
        />
          <div className={classes.ButtonContent}>
          <a href='http://localhost:3001/auth/login/naver' sytle={{textDecoration:'none'}}>
           <Button variant="contained" color="primary" sytle={{textDecoration:'none'}}>
        네이버 아이디로 로그인하기
        </Button>
        </a>
        </div>
          </CardContent>
        </Card>
     </div>
     </Fragment>
    );
  }
}



export default withStyles(styles)(Login);