import axios from "axios";
import { API_ENDPOINT } from "../constants";

const createTodo = (data) => axios.post(API_ENDPOINT + "/todos", data);
const getTodos = () => axios.get(API_ENDPOINT + "/todos");
const getTodosByUserId = (userId) =>
  axios.get(API_ENDPOINT + "/todos?userId=" + userId);
const getTodosById = (id) => axios.get(API_ENDPOINT + "/todos/" + id);
const removeTodosById = (id) => axios.delete(API_ENDPOINT + "/todos/" + id);
const updateTodoById = (id, data) =>
  axios.put(API_ENDPOINT + "/todos/" + id, data);

export {
  createTodo,
  getTodos,
  getTodosByUserId,
  getTodosById,
  removeTodosById,
  updateTodoById,
};
