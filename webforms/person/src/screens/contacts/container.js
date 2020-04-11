import React, { useEffect, useState, Fragment } from 'react';
import axios from "axios";
import PropTypes from 'prop-types';
import EditIcon from '@material-ui/icons/Edit'
import InputAdornment from '@material-ui/core/InputAdornment';
import DeleteIcon from '@material-ui/icons/Delete'
import CloseIcon from '@material-ui/icons/Close';

import { isMobile } from "react-device-detect";

import { 
  Table,TableBody,TableCell,TableContainer,
  TableHead,TableRow,Paper, Button, TextField,
  Dialog, DialogActions, DialogContent, DialogTitle,
  Container,IconButton,Snackbar
} from '@material-ui/core';

function ContactContainer (props) {

  // const {getContactList } = props;
  const [info, setData] = useState({});
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [editInfo, seteditInfo] = useState({});
  const handleChange = name => event => setState({...state, [name]: event.target.value});
  const [phoneNumberLogin, setPhoneNumberLogin] = useState("+63");
  const [state, setState] = useState({
    fullName: "",
    contactNumber: "+63",
  });

  const [snackBar, setSnackBar] = useState({
    open: false,
    message: ""
  });


  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleUpdate = (nextProps) => {
    setEdit(true)
    seteditInfo(nextProps)
  };

  const getContactList = async () => {
    await axios.post(`${process.env.REACT_ENDPOINT}/view-contact-person`, {
        ppk:  props.details.sub,
    }).then(response => {
      setData({ data:  response.data.Items })
    }).catch(error => {
    });
  }

  const validatePhone = (event) => {
    if (event.target.value.indexOf("+63") !== 0){
      editInfo({
        ...state, 
        "contactNumber": state.contactNumber
      })
    } else {
      setState({
        ...state, 
        "contactNumber": event.target.value.replace(/[^0-9+]/g, '')
      })
    }
    
  };

  const validatePhone2 = (event) => {
    if (event.target.value.indexOf("+63") !== 0){
      seteditInfo({
        ...editInfo, 
        phone_number: "+63"
      })
    } else {
      seteditInfo({
        ...editInfo, 
        phone_number: event.target.value.replace(/[^0-9+]/g, '')
      })
    }
  };
  const onClickCreateContact = async () => {
    axios.post(`${process.env.REACT_ENDPOINT}/create-contact-person`, {
      ppk:  props.details.sub,
      n:    state.fullName,
      pn:   state.contactNumber,
    }).then(response => {
      handleClose()
      setSnackBar({ open: true, message: response.data.msg})
      setState({
        fullName: "",
        contactNumber: "+63",
      });
      getContactList()
    }).catch(error => {
    });
  }
  const infoHandler = name => event => seteditInfo({...editInfo, full_name: event.target.value});
  const onClickUpdateContact = async () => {
    axios.post(`${process.env.REACT_ENDPOINT}/update-contact-person`,{
      ppk:  props.details.sub,
      n:    editInfo.full_name,
      ts :  editInfo.timestamp.toString(),
      pn:   editInfo.phone_number,
    }).then(response => {
      handleClose()
      getContactList()
      setSnackBar({ open: true, message: response.data.msg})
    }).catch(error => {
    });
  }

  const onClickDeleteContact = async (nextprops) => {
    await axios.post(`${process.env.REACT_ENDPOINT}/delete-contact-person`, {
        ppk:  props.details.sub,
        ts : nextprops.timestamp
    }).then(response => {
      getContactList()
      setSnackBar({ open: true, message: response.data})
    }).catch(error => {
    });
  }

  const handleClose = () => {
    setOpen(false);
    setEdit(false);

  };

  useEffect(() => {
    getContactList()
  },[]);
  if(isMobile) {
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
                  id="phone"
                  label="Philippines (+63)"
                  value={state.contactNumber}
                  inputProps={{
                    maxLength: 13,
                    onInput: (event) => validatePhone(event)
                  }}
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
                  inputProps={{
                    maxLength: 13,
                    onInput: (event) => validatePhone2(event)
                  }}
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
          <Snackbar
            anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            open={snackBar.open}
            onClose={() => setSnackBar({ open: false, message: ""})}
            message={snackBar.message}
            action={[
              <IconButton key="close" aria-label="close" color="inherit" onClick={() => setSnackBar({ open: false, message: ""})}>
                <CloseIcon />
              </IconButton>
            ]}
          />
        </Container>
      </React.Fragment>
    )
  } else {
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
                  <TableCell  width='200' align="left"></TableCell>
                  <TableCell>Full Name</TableCell>
                  <TableCell align="left">Contact</TableCell>
                </TableRow>
              </TableHead>
  
              { !info.data  ? (
                 <TableBody>
                   <TableRow >
                     <TableCell component="th" scope="row"></TableCell>
                     <TableCell align="left"></TableCell>
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
                  id="phone"
                  label="Philippines (+63)"
                  value={state.contactNumber}
                  inputProps={{
                    maxLength: 13,
                    onInput: (event) => validatePhone(event)
                  }}
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
                  // onChange={infoHandler("phone_number")}
                  inputProps={{
                    maxLength: 13,
                    onInput: (event) => validatePhone2(event)
                  }}
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
          <Snackbar
            anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            open={snackBar.open}
            onClose={() => setSnackBar({ open: false, message: ""})}
            message={snackBar.message}
            action={[
              <IconButton key="close" aria-label="close" color="inherit" onClick={() => setSnackBar({ open: false, message: ""})}>
                <CloseIcon />
              </IconButton>
            ]}
          />
  
        </Container>
      </React.Fragment>
    )

  }
  
} 

ContactContainer.propTypes = {

}

export default ContactContainer;