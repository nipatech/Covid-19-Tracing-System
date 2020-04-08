import { connect } from 'react-redux';

import Container from './container';
import axios from 'axios'


/**
 * Get contact list request
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
    getContactList
};


export default connect(mapStateToProps,actionCreators)(Container);