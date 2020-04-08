import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Table,TableBody,TableCell,
  TableContainer,TableHead,TableRow,Paper,
} from '@material-ui/core';


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