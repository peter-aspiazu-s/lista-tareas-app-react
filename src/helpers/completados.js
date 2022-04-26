import { app } from "../firebase/firebase-config";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
const db = getFirestore(app);

export const completados = async(uid) => {
    try {
        const todos = [];
        const q = query(collection(db, `${uid}`), where("completado", "==", true));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            todos.push(doc.data());
        })
        return todos;
    } catch (error) {
        console.error(error);
    }
}