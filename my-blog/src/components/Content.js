import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import ItemWrite from './ItemWrite';
import ItemList from './ItemList';
import ItemContent from './ItemContent';
import MenuWrite from './MenuWrite';
import { Route } from 'react-router-dom';

const styles = {
};

class Content extends Component {
  
  render() {
    const { classes } = this.props;

    let pageContent = null;
    switch(this.props.pageType){
      case 0:
        pageContent = <ItemList menuid={this.props.value} />
        break;
      case 1:
        pageContent = <ItemContent />
        break;
      case 2:
        pageContent = <ItemWrite />
        break;
    }

    return (
      <Fragment>
        <Route exact path="/" component={ItemList}/>
        <Route path="/ItemWrite" component={ItemWrite}/>
        <Route path="/MenuWrite" component={MenuWrite}/>
      </Fragment>
    );
  }
}

Content.propTypes = {
  classes: PropTypes.object.isRequired,
};

let mapStateToProps = (state) => {
  return {
    pageType: state.page.pageType,
    value: state.page.value,
  };
}

Content = connect(mapStateToProps)(Content);

export default withStyles(styles)(Content);