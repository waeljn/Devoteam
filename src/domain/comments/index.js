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

const COLLECTION = "comments";

const createComment = (data) =>
  addDoc(collection(db, COLLECTION, generateId()), data);
const getComments = () => getDocs(collection(db, COLLECTION));
const getCommentsByQuery = ({ field, operator, value }) =>
  getDocs(
    query(collection(db, COLLECTION), where(field, operator, value))
  );
const getCommentById = (id) => getDoc(doc(db, COLLECTION, id));
const removeCommentById = (id) => deleteDoc(doc(db, COLLECTION, id));
const updateCommentById = (id, data, { merge = true } = {}) =>
  setDoc(doc(db, COLLECTION, id), data, { merge });

export {
  createComment,
  getComments,
  getCommentById,
  getCommentsByQuery,
  removeCommentById,
  updateCommentById,
};
