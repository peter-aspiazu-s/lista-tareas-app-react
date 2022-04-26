import { getAuth, signOut } from "firebase/auth";
import { app } from "../firebase/firebase-config";
import Swal from "sweetalert2";
const authRef = getAuth(app);

export const logout = () => {
    signOut(authRef).then(() => {
        //return true;
    }).catch((error) => {
        console.log(error);
        Swal.fire({
            title: 'error',
            text: 'Ocurrio un error intentalo de nuevo',
            icon: 'error',
            confirmButtonText: 'ok'
        })
    })
} 