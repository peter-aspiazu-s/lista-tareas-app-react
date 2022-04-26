import { app } from "../firebase/firebase-config";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import Swal from "sweetalert2";
const db = getFirestore(app); 

export const aggTodo = async(tarea) => {
    try {
        const collectionRef = collection(db, `${tarea.uid}`);
        const docRef = doc(collectionRef, `${tarea.id}` )
        await setDoc(docRef, tarea);
        Swal.fire({
            title: 'Felicidades!',
            text: 'Agregaste una nueva tarea',
            icon: 'success',
            confirmButtonText: 'ok'
        })
    } catch (error) {
        Swal.fire({
            title: 'Error!',
            text: 'Algo salió mal intentalo de nuevo',
            icon: 'error',
            confirmButtonText: 'ok'
        })
    }
}