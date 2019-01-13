import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
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
};

class ItemContent extends Component {
  
  render() {
    const { classes } = this.props;
    return (
    <div className={classes.Content}>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.menu} color="textSecondary">
              나의 스터디
            </Typography>
            <Typography variant="headline" component="h2">
              오늘은 무엇을 공부하였나
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              이혁진
            </Typography>
            <Typography component="p">
              안녕하세요. 블로그를 만들어보았습니다.<br />
              { this.props.pageType }<br />
              { this.props.value }
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
     </div>
    );
  }
}

ItemContent.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(ItemContent);