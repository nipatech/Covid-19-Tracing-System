import React from 'react';
// import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import ContainerUi from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { borders } from '@material-ui/system';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth:"325px",
    border : "1px solid #eee",
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  large: {
    width: "100%",
    height: "100%",
  },
  avatar_content: {
    alignItems:'center',
    justifyContent:'center',
    width:"100%",
    height:"230px"
  },
});

function Container () {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return(
    <React.Fragment>
      <CssBaseline />
      <ContainerUi fixed>
      <Grid container spacing={2}>
        <Grid item xs={12} >
          <Card className={classes.root}>
            <CardContent>
              <Grid item sm={12} xs={12} className={classes.avatar_content} >
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.large} />
              </Grid>

              <TextField
                autoFocus
                margin="dense"
                id="firstName"
                label="First Name"
                type="text"
                fullWidth
                required
              />

              <TextField
                autoFocus
                margin="dense"
                id="middleName"
                label="Middle Name"
                type="text"
                fullWidth
              />

              <TextField
                autoFocus
                margin="dense"
                id="lastName"
                label="Last Name"
                type="text"
                fullWidth
                required
              />
         
              
            </CardContent>
            <CardActions>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      </ContainerUi>
    </React.Fragment>







  )
}

Container.propTypes = {

}

export default Container;