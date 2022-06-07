import {
  collection,
  addDoc,
  doc,
  getDoc,
  getFirestore,
  setDoc,
  deleteDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import config from "../auth/firebase.config.json";
import { generateId } from "../constants";

const app = initializeApp(config);
const db = getFirestore(app);

const COLLECTION = "todos";

const createTodo = (data) =>
  addDoc(collection(db, COLLECTION, generateId()), data);
const getTodos = () => getDocs(collection(db, COLLECTION));
const getTodosByQuery = ({ field, operator, value }) =>
  getDocs(
    query(collection(db, COLLECTION), where(field, operator, value))
  );
const getTodoById = (id) => getDoc(doc(db, COLLECTION, id));
const removeTodoById = (id) => deleteDoc(doc(db, COLLECTION, id));
const updateTodoById = (id, data, { merge = true } = {}) =>
  setDoc(doc(db, COLLECTION, id), data, { merge });

export {
  createTodo,
  getTodos,
  getTodoById,
  getTodosByQuery,
  removeTodoById,
  updateTodoById,
};
