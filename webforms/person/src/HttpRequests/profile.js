import axios from "axios";

export const getProfile = ({ params } = {}) => axios.get(`profile`, { params });
export const updateProfile = ({ id, data }) => axios.put(`profile/${id}`, data);