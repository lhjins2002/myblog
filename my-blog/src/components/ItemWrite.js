import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import MyEditor from './MyEditor';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import MenuTitle from './MenuTitle';

const styles = theme => ({
  card: {
    marginTop: 10,
    minWidth: 275,
    maxWidth: 800,
    width:800,
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
});

class ItemWrite extends Component {

  constructor(props){
      super(props);

      this.state = {
        contentHtml: '',
        itemName:''
      };

      this.UpdateEditorContent = this.UpdateEditorContent.bind(this);
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  UpdateEditorContent(html){
    this.setState({
      contentHtml: html
  });
  }

  saveItem(){
    axios.post('/api/items/add',{
      name: this.state.itemName,
      content: this.state.contentHtml,
      menuid: this.props.match.params.menuid
    })
    .then( response => { console.log(response);
         } );
  }
  
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
      <MenuTitle menuid={this.props.match.params.menuid} userid={this.props.match.params.userid} />
    <div className={classes.Content}>
        <Card className={classes.card}>
          <CardContent>
          <TextField
          id="outlined-with-placeholder"
          label="글 제목"
          placeholder="글 제목을 입력해 주세요."
          fullWidth
          margin="normal"
          variant="outlined"
          value={this.state.itemName}
          onChange={this.handleChange('itemName')}
        />
          <MyEditor onUpdate={this.UpdateEditorContent} />
          <div className={classes.ButtonContent}>
           <Button variant="contained" color="primary" onClick={() => this.saveItem()}>
        저장
        </Button>
        </div>
          </CardContent>
        </Card>
     </div>
     </Fragment>
    );
  }
}

ItemWrite.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ItemWrite);