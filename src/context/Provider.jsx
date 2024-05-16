import { useReducer } from "react";
import Contexto from './Contexto';
import miReducer from './miReducer';
import types from './types';

const init=()=>{
    const valor=localStorage.getItem("estado")
    return{
        estado:!!valor
    }
}

const Provider=({children})=> {
    const [logeado, dispatch]=useReducer(miReducer,{}, init);

    const logearme=()=>{
        const action={
            type:types.login
        }
        localStorage.setItem('estado',true)
        dispatch(action)
    }

    const deslogearme=()=>{
        const action={
            type:types.logout
        }
        localStorage.removeItem('estado')
        dispatch(action)
    }

    
    return (
        <Contexto.Provider value={{
            ...logeado,
            logearme,
            deslogearme
        }}>
            {children}
        </Contexto.Provider>
    )
}

export default Provider
