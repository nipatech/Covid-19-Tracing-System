import React from 'react';
import PropTypes from 'prop-types';
import { 
  Table,TableBody,TableCell,TableContainer,
  TableHead,TableRow,Paper, Button, TextField,
  Dialog, DialogActions, DialogContent, DialogTitle,
  Container
} from '@material-ui/core';

function ContactContainer (props) {

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
                <TableCell>First Name</TableCell>
                <TableCell align="left">Last Name</TableCell>
                <TableCell align="left">Contact</TableCell>
                <TableCell align="left">Address</TableCell>
              </TableRow>
            </TableHead>
        
            <TableBody>
            {props.contactList.map((row) => (
              <TableRow key={row.firstname}>
                <TableCell component="th" scope="row">{row.firstName}</TableCell>
                <TableCell align="left">{row.lastName}</TableCell>
                <TableCell align="left">{row.contactNumber}</TableCell>
                <TableCell align="left">{row.address}</TableCell>
              </TableRow>
            ))}
            </TableBody>
          </Table>
        </TableContainer> 

        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">New Contact</DialogTitle>
            <DialogContent>
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
                margin="dense"
                id="lastName"
                label="Last Name"
                type="text"
                fullWidth
                required
              />
              <TextField
                margin="dense"
                id="contactNumber"
                label="Contact Number"
                type="text"
                fullWidth
                required
              />
              <TextField
                margin="dense"
                id="Address"
                label="Address"
                type="text"
                fullWidth
              />
            </DialogContent>
        
          <DialogActions>
            <Button onClick={handleClose} color="primary">Cancel</Button>
            <Button onClick={props.createContact} color="primary">Save</Button>
          </DialogActions>
        </Dialog>

      </Container>
    </React.Fragment>
  )
} 

ContactContainer.propTypes = {

}

export default ContactContainer;