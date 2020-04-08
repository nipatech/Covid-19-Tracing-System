import { connect } from 'react-redux';

import Container from './container';
import axios from 'axios'


function getContactList(firstname, lastname, contact, address) {
    return {firstname, lastname, contact, address}
}

const contactList = [
    getContactList('Patrick Mark', 'Mazo', '+639361555555', 'Quezon City'),
    getContactList('Joejin', 'Chavez', '+639361555555', 'Quezon City'),
    getContactList('Rowel', 'de Guzman', '+639361555555', 'Quezon City'),
    getContactList('Jhon Patrick', 'Jampolina', '+639361555555', 'Quezon City'),
];


const mapStateToProps = (state) => ({
    contactList : contactList
});

const actionCreators = {
};


export default connect(mapStateToProps,actionCreators)(Container);