import { logout } from "../helpers/logout";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "./UserContext";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../firebase/firebase-config";
import Swal from "sweetalert2";
const authRef = getAuth(app);

export const Logout = () => {
    
    const navigate = useNavigate();
    
    const handleClickLogout = () => {
        signOut(authRef).then(() => {
            navigate("/login", {
                replace: true
            });
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

    return (
        <button
            className="button-logout"
            onClick={ handleClickLogout }
        >Logout</button>
    );
}