import axios from "axios";
import { API_ENDPOINT } from "../constants";

const createUser = (data) => axios.post(API_ENDPOINT + "/user/add", data);
const getUsers = () => axios.get(API_ENDPOINT + "/user");
const getUserById = (id) => axios.get(API_ENDPOINT + "/user/" + id);
const removeUserById = (id) =>
  axios.delete(API_ENDPOINT + "/user/delete/" + id);
const updateUserById = (data) => axios.put(API_ENDPOINT + "/user/update", data);

export { createUser, getUsers, getUserById, removeUserById, updateUserById };
