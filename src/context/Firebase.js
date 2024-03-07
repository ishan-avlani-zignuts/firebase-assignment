import { createContext, useContext, useState, useEffect} from "react";
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup , onAuthStateChanged, signOut} from "firebase/auth";
import {getFirestore , collection , addDoc, getDocs, query, where, doc, deleteDoc,updateDoc} from "firebase/firestore"

const FirebaseContext = createContext(null);

const firebaseConfig = {
    apiKey: "AIzaSyDtc_Bjg4n-JJOGnsiPq92vAwarC33wn1g",
    authDomain: "todo-5ada1.firebaseapp.com",
    projectId: "todo-5ada1",
    storageBucket: "todo-5ada1.appspot.com",
    messagingSenderId: "820778325808",
    appId: "1:820778325808:web:2529d8b1cc9017d32ddaf5"
  };

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const fireStore = getFirestore(firebaseApp);
export const useFirebase = () => useContext(FirebaseContext);


//read details
export const fetchUserTasks = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
        console.error('User not authenticated');
        return [];
    }

    try {
        const q = query(collection(fireStore, 'tasks'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);

        const userTasks = [];
        querySnapshot.forEach((doc) => {
            userTasks.push({ id: doc.id, ...doc.data() });
        });

        return userTasks;
    } catch (error) {
        console.error('Error fetching user tasks:', error);
        return [];
    }
};



//delete
export const deleteTask = async (taskId) => {
    try {
      await deleteDoc(doc(fireStore, 'tasks', taskId));
      console.log('Task deleted successfully');
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };



  //edit
  export const updateTask = async (taskId, updatedTaskText) => {
    try {
      const taskRef = doc(fireStore, 'tasks', taskId);
      await updateDoc(taskRef, { task: updatedTaskText });
      console.log('Task updated successfully');
    } catch (error) {
      console.error('Error updating task:', error);
    }
};

//auth and addd
 
export const FirebaseProvider = (props) => {
    const [user,setUser] = useState(null);
    useEffect(()=>{
        onAuthStateChanged(firebaseAuth, (user) =>{
           if(user) setUser(user);
           else setUser(null);
        });
    }, []);

    const signupUserWithEmailAndPassword = (email, password) => createUserWithEmailAndPassword(firebaseAuth, email, password);
    const loginUserWithEmailAndPassword = (email, password) => signInWithEmailAndPassword(firebaseAuth, email, password);
    const loginWithGoogle = () => signInWithPopup(firebaseAuth, googleProvider)
    const logout = () => signOut(firebaseAuth);
    const isLoggedIn = user ? true : false;

    console.log(user)

    const handleAddTodo = async (task) => {
        try {
            const user = firebaseAuth.currentUser;
            if (!user) {
                console.error("User not authenticated");
                return;
            }
    
            console.log("User ID:", user.uid);
            console.log("User Email:", user.email);
            
            const docRef = await addDoc(collection(fireStore, 'tasks'), {
                task,
                userId: user.uid,
                userEmail: user.email,
            });
            console.log("Document added with ID:", docRef.id);
            
        } catch(error){
            console.log("error is ",error)
        }
    }

    return (
        <FirebaseContext.Provider value={{ signupUserWithEmailAndPassword, loginUserWithEmailAndPassword, loginWithGoogle, isLoggedIn, logout, handleAddTodo}}>
            {props.children}
        </FirebaseContext.Provider>
    );
};


