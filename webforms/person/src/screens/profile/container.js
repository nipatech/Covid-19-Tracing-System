import React, { useEffect, useState, Fragment } from 'react';
import axios from "axios";
import PropTypes from 'prop-types';
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import { 
  Table,TableBody,TableCell,TableContainer,
  TableHead,TableRow,Paper, Button, TextField,
  Dialog, DialogActions, DialogContent, DialogTitle,
  Container,IconButton
} from '@material-ui/core';

function ContactContainer (props) {

  // const {getContactList } = props;
  const [info, setData] = useState({});
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [editInfo, seteditInfo] = useState({});
  const handleChange = name => event => setState({...state, [name]: event.target.value});
  const [state, setState] = useState({
    fullName: "",
    contactNumber: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleUpdate = (nextProps) => {
    setEdit(true)
    seteditInfo(nextProps)
  };

  const getContactList = async () => {
    console.log(props);
    await axios.post(`${process.env.REACT_ENDPOINT}/view-contact-person`, {
        ppk:  props.details.sub,
    },{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': props.jwtToken
      }
    }).then(response => {
      setData({ data:  response.data.Items })
    }).catch(error => {
    console.log(error)
    });
  }

  const onClickCreateContact = async () => {
    axios.post(`${process.env.REACT_ENDPOINT}/create-contact-person`, {
      ppk:  props.details.sub,
      n:    state.fullName,
      pn:   state.contactNumber,
    },{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': props.jwtToken
      }
    }).then(response => {
      handleClose()
      getContactList()
    }).catch(error => {
      console.log(error)
    });
  }
  const infoHandler = name => event => seteditInfo({...editInfo, [name]: event.target.value});
  const onClickUpdateContact = async () => {
    axios.post(`${process.env.REACT_ENDPOINT}/update-contact-person`,{
      ppk:  props.details.sub,
      n:    editInfo.full_name,
      ts :  editInfo.timestamp.toString(),
      pn:   editInfo.phone_number,
    },{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': props.jwtToken
      }
      }).then(response => {
      handleClose()
      getContactList()
    }).catch(error => {
      console.log(error)
    });
  }

  const onClickDeleteContact = async (nextprops) => {
    await axios.post(`${process.env.REACT_ENDPOINT}/delete-contact-person`, {
        ppk:  props.details.sub,
        ts : nextprops.timestamp
    },{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': props.jwtToken
      }
    }).then(response => {
      getContactList()
    }).catch(error => {
    console.log(error)
    });
  }

  const handleClose = () => {
    setOpen(false);
    setEdit(false);

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
                <TableCell  width='130' align="left"></TableCell>
                <TableCell>Full Name</TableCell>
              </TableRow>
            </TableHead>
            { !info.data  ? (
               <TableBody>
                 <TableRow >
                   <TableCell component="th" scope="row"></TableCell>
                   <TableCell align="left"></TableCell>
                 </TableRow>
             </TableBody>
            ) : (
              <TableBody>
                { info.data.map((row) => (
                  <TableRow key={row.full_name}>
                     <TableCell align="left"> 
                     <IconButton variant="contained" style={{marginLeft : "auto"}} onClick={() => handleUpdate(row)}><EditIcon /></IconButton>
                     <IconButton variant="contained" style={{marginLeft : "auto"}} onClick={() => onClickDeleteContact(row)}><DeleteIcon /></IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.full_name} <br></br>
                      {row.phone_number}
                    </TableCell>
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
        <Dialog open={edit} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Update Contact</DialogTitle>
            <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                id="fullName"
                label="Full Name"
                value={editInfo.full_name}
                onChange={infoHandler("full_name")}
                type="text"
                fullWidth
                required
              />
              <TextField
                margin="dense"
                id="contactNumber"
                label="Contact Number"
                value={editInfo.phone_number}
                onChange={infoHandler("phone_number")}
                type="text"
                fullWidth
                required
              />
            </DialogContent>
        
          <DialogActions>
            <Button onClick={handleClose} color="primary">Cancel</Button>
            <Button onClick={onClickUpdateContact} color="primary">Save</Button>
          </DialogActions>
        </Dialog>

      </Container>
    </React.Fragment>
  )
} 

ContactContainer.propTypes = {

}

export default ContactContainer;