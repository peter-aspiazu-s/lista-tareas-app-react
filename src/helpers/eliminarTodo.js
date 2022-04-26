import { app } from "../firebase/firebase-config";
import { getFirestore, collection, doc, deleteDoc } from "firebase/firestore";
import Swal from "sweetalert2";
const db = getFirestore(app);

export const eliminarTodo = async(todo) => {
    try {
        const collectionRef = collection(db, `${todo.uid}`);
        const docuRef = doc(collectionRef, `${todo.id}`);
        const eliminado = await deleteDoc(docuRef);
        return eliminado;
    } catch (error) {
        Swal.fire({
            title: 'Error!',
            text: 'Algo salió mal intentalo de nuevo',
            icon: 'error',
            confirmButtonText: 'ok'
        })
    }
}