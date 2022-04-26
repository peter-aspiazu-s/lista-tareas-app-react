import { useEffect, useState } from "react";
import { AppRouter } from "./router/AppRouter";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "./firebase/firebase-config";
import { UserContext } from "./components/UserContext";
import { leerTodos } from "./helpers/leerTodos";
const auth = getAuth(app);

export const ListaTareaApp = () => {

    const [ uid, setUid ] = useState("");
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        onAuthStateChanged(auth, async(user) => {
            if(user){
                if(user.uid){
                    setUid(user.uid);
                    setLoading(false);
                } else{
                    setLoading(false);
                }
            }else{
                setLoading(false);
            }
        })
    }, []);

    return(
        <UserContext.Provider value={{
            uid,
        }}>
            {
               loading ? 
                <div className="loading">
                    <div className="loadingio-spinner-bean-eater-dhru3qf8htd">
                        <div className="ldio-0486ooibbg2h">
                            <div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                            <div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                    </div> 
                </div>
                :
                <AppRouter />
            }
        </UserContext.Provider>
    );
}