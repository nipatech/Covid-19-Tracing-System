import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

// import PropTypes from 'prop-types';

import { 
  TextField, Avatar, CardActions,
  Card, CardContent, Button, Grid,
  Typography, CssBaseline, Container 
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth:"325px",
    border : "1px solid #eee",
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
  margin: {
    margin: theme.spacing(1),
  },
}));

function ProfileContainer (props) {
  const classes = useStyles();

  return(
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
      <Grid container spacing={2}>
        <Grid item xs={12} >
          <Card className={classes.root}>
            <CardContent>
              <Grid item sm={12} xs={12} className={classes.avatar_content} >
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.large} />
              </Grid>

              <Grid item sm={12} xs={12} >
 
              </Grid>

              <TextField
                autoFocus
                margin="dense"
                id="firstName"
                label="First Name"
                type="text"
                fullWidth
                value={props.firstName}
                required
              />

              <TextField
                autoFocus
                margin="dense"
                id="middleName"
                label="Middle Name"
                type="text"
                value={props.middleName}
                fullWidth
              />

              <TextField
                autoFocus
                margin="dense"
                id="lastName"
                label="Last Name"
                type="text"
                fullWidth
                value={props.lastName}
                required
              />

              <TextField
                autoFocus
                margin="dense"
                id="contactNo"
                label="Contact No"
                type="text"
                fullWidth
                value={props.contactNo}
                required
              />
         
            </CardContent>
            <CardActions>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      </Container>
    </React.Fragment>
  )
}

ProfileContainer.propTypes = {

}

export default ProfileContainer;