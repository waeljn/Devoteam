import axios from "axios";
import { API_ENDPOINT } from "../constants";

const createProject = (data) => axios.post("http://localhost:8080/project/add",data);
// const getProjects = () => axios.get("http://localhost:8080/project/all");
const getProjects = () => axios.get(`${API_ENDPOINT}/posts`);
const getProjectsByUserId = (userId) =>
  axios.get(API_ENDPOINT + "/posts?userId=" + userId);
const getProjectById = (id) => axios.get("http://localhost:8080/project/" + id);
const removeProjectById = (id) => axios.delete(API_ENDPOINT + "/posts/" + id);
const updateProjectById = (id, data) =>
  axios.put(API_ENDPOINT + "/posts/" + id, data);

export {
  createProject,
  getProjects,
  getProjectById,
  getProjectsByUserId,
  removeProjectById,
  updateProjectById,
};
