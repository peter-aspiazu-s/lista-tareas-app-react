import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Swal from "sweetalert2";
import { app } from "../firebase/firebase-config";
const authRef = getAuth(app);

export const auth = async(email, password) => {
    try {
        const register = await createUserWithEmailAndPassword(authRef, email, password);
        console.log(register);
        Swal.fire({
            title: 'Enviado!',
            text: email,
            icon: 'success',
            confirmButtonText: 'ok'
        })
    } catch (error) {
        Swal.fire({
            title: 'error',
            text: 'Ocurrio un error intentalo de nuevo',
            icon: 'error',
            confirmButtonText: 'ok'
        })
    }
}
