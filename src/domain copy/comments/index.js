import axios from "axios";
import { API_ENDPOINT } from "../constants";

const createComment = (data) => axios.post(API_ENDPOINT + "/comments", data);
const getComments = () => axios.get(API_ENDPOINT + "/comments");
const getCommentsByUserId = (userId) =>
  axios.get(API_ENDPOINT + "/comments?userId=" + userId);
const getCommentsById = (id) => axios.get(API_ENDPOINT + "/comments/" + id);
const removeCommentsById = (id) => axios.delete(API_ENDPOINT + "/comments/" + id);
const updateCommentById = (id, data) =>
  axios.put(API_ENDPOINT + "/comments/" + id, data);

export {
  createComment,
  getComments,
  getCommentsByUserId,
  getCommentsById,
  removeCommentsById,
  updateCommentById,
};
