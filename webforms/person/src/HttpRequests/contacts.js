import axios from "axios";

export const createContact = ({ data }) => axios.post('contact', data);
export const getProfile = ({ params } = {}) => axios.get(`contact`, { params });
export const updateProfile = ({ id, data }) => axios.put(`contact/${id}`, data);