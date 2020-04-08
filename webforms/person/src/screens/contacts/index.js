import { connect } from 'react-redux';

import ContactContainer from './container';
import axios from 'axios'


/**
 * GET /contacts?page=&row=
 * [
 *      {
 *          "firstName" : "Patrick Mark"
 *          "lastName" : "Mazo",
 *          "contactNumber" : "+639361555555",
 *          "address" : "Quezon City" (Optional)
 *      }
 * ]
 */
const getContactList = () => {
    axios.get("")
      .then(res => {
    })
}

/**
 * POST /contact
 * [
 *      {
 *          "firstName" : "Patrick Mark"
 *          "lastName" : "Mazo",
 *          "contactNumber" : "+639361555555",
 *          "address" : "Quezon City" (Optional)
 *      }
 * ]
 */
const createContact = (firstName, lastName, contactNumber, addresss) => {
    console.log("waddap");
}


/** Dummy Data */
const contactList = [
    {
        "firstName" : 'Patrick Mark', 
        "lastName" : 'Mazo', 
        "contactNumber" : '+639361555555',
        "address" : 'Quezon City'
    },
    {
        "firstName" : 'Rowel', 
        "lastName" : 'de Guzman', 
        "contactNumber" : '+639361555555',
        "address" : 'Quezon City'
    },
    {
        "firstName" : 'Joejin', 
        "lastName" : 'Chavez', 
        "contactNumber" : '+639361555555',
        "address" : 'Quezon City'
    },
    {
        "firstName" : 'Jhon Patrick', 
        "lastName" : 'Jampolina', 
        "contactNumber" : '+639361555555',
        "address" : 'Quezon City'
    }
];

const mapStateToProps = (state) => ({
    contactList : contactList
});

const actionCreators = {
    getContactList,
    createContact
};


export default connect(mapStateToProps,actionCreators)(ContactContainer);