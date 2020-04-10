import React, { useEffect, useState, Fragment } from 'react';
import axios from "axios";
import PropTypes from 'prop-types';

import moment  from 'moment';
import momentTz from 'moment-timezone';
import { 
  Table,TableBody,TableCell,TableContainer,
  TableHead,TableRow,Paper, Button, TextField,
  Dialog, DialogActions, DialogContent, DialogTitle,
  Container
} from '@material-ui/core';

function ContactContainer (props) {

  // const {getContactList } = props;
  const [info, setData] = useState({});
  const [open, setOpen] = React.useState(false);
  const handleChange = name => event => setState({...state, [name]: event.target.value});
  const [state, setState] = useState({
    fullName: "",
    contactNumber: "",
    address: "",
    contactList : [],
  });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const getContactList = async () => {
    await axios.post("https://lltkyad8xg.execute-api.us-east-1.amazonaws.com/COVID/view-contact-person", {
        ppk:  props.details.sub,
    }).then(response => {
      setData({ data:  response.data.Items })

      console.log();
    
    }).catch(error => {
    console.log(error)
    });
  }

  const onClickCreateContact = async () => {
    axios.post("https://lltkyad8xg.execute-api.us-east-1.amazonaws.com/COVID/create-contact-person", {
      ppk:  props.details.sub,
      n:    state.fullName,
      pn:   state.contactNumber,
    }).then(response => {
      handleClose()
    }).catch(error => {
      console.log(error)
    });
  }


  const onClickUpdateContact = async () => {
    var now = new Date()
    now = momentTz(now.getTime()).tz('Asia/Hong_Kong').format()
    console.log('NowTz:', now)
    now = moment(now).valueOf()
    console.log('Now:', now)
    axios.post("https://lltkyad8xg.execute-api.us-east-1.amazonaws.com/COVID/update-contact-person", {
      ppk:  props.details.sub,
      n:    state.fullName,
      ts :   now.toString(),
      pn:   state.contactNumber,
    }).then(response => {
      handleClose()
    }).catch(error => {
      console.log(error)
    });
  }

  const handleClose = () => {
    setOpen(false);

  };
  useEffect(() => {
    getContactList()
    console.log();
  },[]);

  return(
    <React.Fragment>
      <Container maxWidth="xl">
        <div style={{display : "flex", marginBottom : "20px"}}>
          <Button variant="contained" style={{marginLeft : "auto"}} color="primary" onClick={handleClickOpen}>
            NEW CONTACT
          </Button>
        </div>
        <TableContainer component={Paper}>
          <Table aria-label="Contact Table">
            <TableHead>
              <TableRow>
                <TableCell>Full Name</TableCell>
                <TableCell align="left">Contact</TableCell>
              </TableRow>
            </TableHead>

            { !info.data  ? (
              <div>Empty</div>
            ) : (
              <TableBody>
                      { info.data.map((row) => (
                        <TableRow key={row.full_name}>
                          <TableCell component="th" scope="row">{row.full_name}</TableCell>
                          <TableCell align="left">{row.phone_number}</TableCell>
                        </TableRow>
                      ))}
                      </TableBody>
            )}
          </Table>
        </TableContainer> 

        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">New Contact</DialogTitle>
            <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                id="fullName"
                label="Full Name"
                value={state.fullName}
                onChange={handleChange("fullName")}
                type="text"
                fullWidth
                required
              />
              <TextField
                margin="dense"
                id="contactNumber"
                label="Contact Number"
                value={state.contactNumber}
                onChange={handleChange("contactNumber")}
                type="text"
                fullWidth
                required
              />
            </DialogContent>
        
          <DialogActions>
            <Button onClick={handleClose} color="primary">Cancel</Button>
            <Button onClick={onClickCreateContact} color="primary">Save</Button>
          </DialogActions>
        </Dialog>

      </Container>
    </React.Fragment>
  )
} 

ContactContainer.propTypes = {

}

export default ContactContainer;