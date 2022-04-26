import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Swal from "sweetalert2";
import { app } from "../firebase/firebase-config";
const authRef = getAuth(app);

export const login = async(email, password) => {
    try {
        const logIn = await signInWithEmailAndPassword(authRef, email, password);
        Swal.fire({
            title: 'Enviado!',
            text: email,
            icon: 'success',
            confirmButtonText: 'ok'
        })
        return true;
    } catch (error) {
        Swal.fire({
            title: 'error',
            text: 'Ocurrio un error intentalo de nuevo',
            icon: 'error',
            confirmButtonText: 'ok'
        })
    }
}