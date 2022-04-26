import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import validator from 'validator';
import { auth } from "../../helpers/auth";

export const Auth = () => {

    const [ authState, setAuthState ] = useState(0);

    const [ formValues, setFormValues, handleInputChange ] = useForm({
        nombre: "",
        email: "",
        password: "",
        password2: ""
    });

    const { nombre, email, password, password2 } = formValues;

    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        if(isValidate()){
            console.log("formulario enviado");
            auth(email, password2);
            navigate("/login");
        }
    }
 
    const isValidate = () => {
        if(nombre.trim().length < 1){
            setAuthState(1); //nombre invalido
            return false;
        } 
        if(!validator.isEmail(email)){
            setAuthState(2); //email invalido
            return false;
        } 
        if(password.trim().length < 6){
            setAuthState(3); //password invalido
            return false;
        }
        if(password2 !== password){
            setAuthState(4); //confirm password invalido
            return false;
        }
        return true;
    }

    return(
        <div className="auth">
            <div className="auth__container">
                <h3 className="auth__h3">Register</h3>
                <form 
                    className="auth__form"
                    onSubmit={handleSubmit}    
                >
                    {
                        (authState === 1) ?
                        <p className="auth__alert">El nombre es invalido</p>
                        :
                        <label htmlFor="nombre">Name</label>
                    }
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        className="auth__input-nombre"
                        onChange={handleInputChange}
                    />
                    {
                        (authState === 2) ?
                        <p className="auth__alert">El correo es invalido</p>
                        :
                        <label htmlFor="email">Email</label>
                    }
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="auth__input-email"
                        onChange={handleInputChange}
                    />
                    {
                        (authState === 3) ?
                        <p className="auth__alert">El password es invalido (6 o mas caracteres)</p>
                        :
                        <label htmlFor="password">Password</label>
                    }
                    <input 
                        type="password"
                        id="password"
                        name="password"
                        className="auth__input-password"
                        onChange={handleInputChange}
                    />
                    {
                        (authState === 4) ?
                        <p className="auth__alert">El password es invalido</p>
                        :
                        <label htmlFor="password2">Confirm Password</label>
                    }
                    <input 
                        type="password"
                        id="password2"
                        name="password2"
                        className="auth__input-password2"
                        onChange={handleInputChange}
                    />
                    <button
                        className="btn"
                        onClick={handleSubmit} 
                    >Submit</button>
                </form>
                <Link 
                    className="auth__link"
                    to="/login"
                >login</Link>
            </div>
        </div>
    );
}