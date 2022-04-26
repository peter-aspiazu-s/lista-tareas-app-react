import { useState } from "react"

export const useForm = ( initialState = {} ) => {
// 14.- Le pasamos como argumento initialState que tendra un objeto vacio
// como valor por defecto

    const [ values, setValues ] = useState( initialState );
    // 15.- Importamos el hook useState y su valor inicial será el argumento initialState

    // 16.- Desestructuramos el hook y accederemos a values y setValues

    const handleInputChange = (e) => {
        setValues({
            ...values,
            [ e.target.name ]: e.target.value
        })
    }
    // 17.- Creamos una funcion que modifica el estado agregandole al arreglo values el name como key y un valor a ese name

    const reset = () => {
        setValues( initialState );
    }
    // 18.- Creamos una funcion para restear el formulario

    return [ values, setValues, handleInputChange, reset ];
    // 19.- Retornamos el arreglo, la funcion handleInputChange y la funcion reset para usarlos en el componente TodoAdd.

}
// 13.- Creamos y exportamos la funcion useForm