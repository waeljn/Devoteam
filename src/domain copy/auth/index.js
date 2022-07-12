import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updatePassword,
  user,
} from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import config from "./firebase.config.json";

const app = initializeApp(config);
const auth = getAuth();
const db = getFirestore(app);
const ROLES_COLLECTION = "accounts";

const login = async ({ email, password }) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

const logout = async () => {
  return await signOut(auth);
};

const createUser = async ({ email, password }) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

const assignRole = async ({ uid, role }) => {
  return setDoc(doc(db, ROLES_COLLECTION, uid), {
    role,
  });
};

const getRole = async () => {
  const { uid } = auth.currentUser;
  const docRef = doc(db, ROLES_COLLECTION, uid);
  const docSnap = await getDoc(docRef);
  let role = null;
  if (docSnap.exists()) {
    role = docSnap.data().role;
  }

  return role;
 
};

const changePassword = async ({ newPassword }) => {
  return updatePassword(auth.currentUser, newPassword);
};

const getUser = () => {
  return auth.currentUser;
};

const roles = ["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_CONSULTANT"];

export {
  login,
  logout,
  createUser,
  assignRole,
  getRole,
  changePassword,
  getUser,
  roles,
};
