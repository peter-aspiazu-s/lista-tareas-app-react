import { useContext } from "react";
import { UserContext } from "../components/UserContext";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Auth } from "../components/auth/Auth";
import { ListaTareaScreen } from "../components/listaTarea/ListaTareaScreen";
import { Login } from "../components/ui/Login";

export const AppRouter = () => {

    const { uid } = useContext(UserContext);

    return(
        <BrowserRouter>
            <Routes>
    
                <Route path="/auth" element={ uid ? <ListaTareaScreen /> : <Auth /> } />
                <Route path="/login" element={ uid ? <ListaTareaScreen /> : <Login /> } />
                <Route path="/" element={ uid ? <ListaTareaScreen /> : <Login /> } />
                <Route path="*" element={ uid ? <ListaTareaScreen /> : <Login /> } />
               
            </Routes>
        </BrowserRouter>
    );
}