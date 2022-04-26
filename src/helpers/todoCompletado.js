import { app } from "../firebase/firebase-config";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import Swal from "sweetalert2";
const db = getFirestore(app); 

export const todoCompletado = async(todo, id) => {
    try {
        const collectionRef = collection(db, `${todo.uid}`);
        const docRef = doc(collectionRef, `${id}` )
        await setDoc(docRef, todo);
    } catch (error) {
        Swal.fire({
            title: 'Error!',
            text: 'Algo salió mal intentalo de nuevo',
            icon: 'error',
            confirmButtonText: 'ok'
        })
    }
}