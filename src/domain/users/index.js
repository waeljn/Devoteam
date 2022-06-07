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

const COLLECTION = "users";

const createUser = (data) =>
  addDoc(collection(db, COLLECTION, generateId()), data);
const getUsers = () => getDocs(collection(db, COLLECTION));
const getUsersByQuery = ({ field, operator, value }) =>
  getDocs(
    query(collection(db, COLLECTION), where(field, operator, value))
  );
const getUserById = (id) => getDoc(doc(db, COLLECTION, id));
const removeUserById = (id) => deleteDoc(doc(db, COLLECTION, id));
const updateUserById = (id, data, { merge = true } = {}) =>
  setDoc(doc(db, COLLECTION, id), data, { merge });

export {
  createUser,
  getUsers,
  getUserById,
  getUsersByQuery,
  removeUserById,
  updateUserById,
};
