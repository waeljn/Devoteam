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

const COLLECTION = "projects";

const createProject = (data) =>
  addDoc(collection(db, COLLECTION, generateId()), data);
const getProjects = () => getDocs(collection(db, COLLECTION));
const getProjectsByQuery = ({ field, operator, value }) =>
  getDocs(
    query(collection(db, COLLECTION), where(field, operator, value))
  );
const getProjectById = (id) => getDoc(doc(db, COLLECTION, id));
const removeProjectById = (id) => deleteDoc(doc(db, COLLECTION, id));
const updateProjectById = (id, data, { merge = true } = {}) =>
  setDoc(doc(db, COLLECTION, id), data, { merge });

export {
  createProject,
  getProjects,
  getProjectById,
  getProjectsByQuery,
  removeProjectById,
  updateProjectById,
};
