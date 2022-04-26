import { useForm } from "../../hooks/useForm";
import { Logout } from "../Logout";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { aggTodo } from "../../helpers/aggTodo";
import Swal from "sweetalert2";
import { leerTodos } from "../../helpers/leerTodos";
import { todoCompletado } from "../../helpers/todoCompletado";
import { eliminarTodo } from "../../helpers/eliminarTodo";
import { completados } from "../../helpers/completados";
import { inCompletos } from "../../helpers/inCompletos";

export const ListaTareaScreen = () => {

    const [ tareas, setTareas ] = useState(null);
    const [ state, setState ] = useState(0);

    const { uid } = useContext(UserContext);

    const [ formValues, setFormValues, handleInputChange ] = useForm({
        tarea: "",
        completado: false,
        date: new Date(),
        uid: uid,
        id: new Date().getTime(),
    })

    const { tarea, completado, id } = formValues;

    const handleSubmit = (e) => {
        e.preventDefault();
        const inputText = document.querySelector(".lista-tarea__input");
        inputText.value = "";
        if(isValidated()){
            aggTodo({...formValues, id: new Date().getTime()});
            actualizarTareas();
        }
    }

    const isValidated = () => {
        if(tarea.trim().length < 4){
            Swal.fire({
                title: 'Error!',
                text: 'Tu tarea debe llevar 4 o más letras',
                icon: 'error',
                confirmButtonText: 'ok'
            })
            return false;
        }
        setFormValues({
            ...formValues,
            uid: uid
        })
        return true;    
    }

    const actualizarTareas = () => {
        leerTodos(uid).then((tareas) => {
            setTareas(tareas);
        })
    }
    
    useEffect(() => {
        if(uid){
            actualizarTareas();
        }
    },[uid]);

    useEffect(() => {
        if(tareas){
            setState(1);
        }
    }, [tareas])

    const handleClickCompletados = () => {
        completados(uid).then((tareasCompletas) => (
            setTareas(tareasCompletas)
        ))
    } 

    const handleClickIncompletos = () => {
        inCompletos(uid).then((tareasIncompletas) => (
            setTareas(tareasIncompletas)
        ))
    }

    return(
        <>
            <Logout />
            <div className="lista-tarea">
                <div className="lista-tarea__container">
                    <h2 className="lista-tarea__h2">LISTA DE TAREAS</h2>
                    <form 
                        className="lista-tarea__formulario"
                        onSubmit={handleSubmit}
                    >
                        <input
                            type="text"
                            name="tarea"
                            className="lista-tarea__input"
                            onChange={handleInputChange}
                            placeholder="Agrega tu tarea"
                        />
                    </form>
                    <div className="lista-tarea__filtros">
                        <button 
                            className="lista-tarea__todos"
                            onClick={() => actualizarTareas()}
                        >Todos</button>
                        <button 
                            className="lista-tarea__completos"
                            onClick={handleClickCompletados}    
                        >Completados</button>
                        <button 
                            className="lista-tarea__incompletos"
                            onClick={handleClickIncompletos}    
                        >Incompletos</button>
                    </div>
                    <div className="lista-tarea__container2">
                        {   
                            (state === 1) &&
                            tareas.map((tarea) => (
                                <div className="lista-tarea__tareas" key={tarea.id} id={tarea.id}>
                                    <p 
                                        className={ (tarea.completado === true) ?
                                            "lista-tarea__p lista-tarea__p-completado"
                                            :
                                            "lista-tarea__p"
                                        }>{tarea.tarea}</p>
                                    <input 
                                        className="lista-tarea__input" 
                                        type="checkbox"
                                        id={tarea.id}
                                        checked={tarea.completado ? true : false }
                                        onChange={(e) => {
                                            const checked = e.target.checked;
                                            const id = e.target.id;
                                            if(checked){
                                                todoCompletado({
                                                    ...tarea,
                                                    completado: true,
                                                }, id)
                                                actualizarTareas();
                                            }else {
                                                todoCompletado({
                                                    ...tarea,
                                                    completado: false,
                                                }, id)
                                                actualizarTareas();
                                            }
                                        }}    
                                    />
                                    <button 
                                        className="lista-tarea__button"
                                        onClick={() => {
                                            eliminarTodo(tarea).then((eliminar) => {
                                                actualizarTareas();
                                            })
                                        }}
                                    >eliminar</button>                        
                                </div>
                            ))   
                        }
                    </div>
                </div>
            </div>
        </>
    );
}