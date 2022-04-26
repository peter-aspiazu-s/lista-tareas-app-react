import { app } from "../firebase/firebase-config";
import { getFirestore, collection, getDocs } from "firebase/firestore";
const db = getFirestore(app);

export const leerTodos = async(uid) => {
    try {
        const todos = [];
        const collectionRef = collection(db, `${uid}`);
        const snapshot = await getDocs(collectionRef);
        snapshot.forEach(doc => {
            todos.push(doc.data());
        });
        return todos;
    } catch (error) {
        console.error(error);
    }
}