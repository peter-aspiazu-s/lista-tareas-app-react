import { Link, useNavigate } from "react-router-dom";
import { login } from "../../helpers/login";
import { useForm } from "../../hooks/useForm";

export const Login = () => {

    const [ formValues, setFormValues, handleInputChange ] = useForm({
        email: "",
        password: ""
    });

    const { email, password } = formValues;

    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const logIn = login(email, password);
        logIn.then((next) => {
            if(next){
                navigate("/", {
                    replace: true
                });
            }
        });
    }

    return(
        <div className="login">
            <div className="login__container">
                <h3 className="login__h3">Login</h3>
                <form className="login__form" onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="email@email.com"
                        className="login__input-email"
                        onChange={handleInputChange}
                    />
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password"
                        id="password"
                        name="password"
                        placeholder="******"
                        className="login__input-password"
                        onChange={handleInputChange}
                    />
                    <button onClick={handleSubmit}>log in</button>
                </form>
                <Link 
                    className="login__link"
                    to="/auth"
                >register</Link>
            </div>
        </div>
    );
}