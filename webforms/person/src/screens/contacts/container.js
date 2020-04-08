import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


function Container (props) {
    const classes = useStyles();

  return(
    <div style={{ textAlign: "center" }}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
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
                <TableCell component="th" scope="row">{row.firstname}</TableCell>
                <TableCell align="left">{row.lastname}</TableCell>
                <TableCell align="left">{row.contact}</TableCell>
                <TableCell align="left">{row.address}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer> 

    </div>
  )
} 

Container.propTypes = {

}

export default Container;