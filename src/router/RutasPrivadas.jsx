import { Navigate } from "react-router-dom";

const RutasPublicas = ({children}) => {
    const estado=localStorage.getItem('estado')
    return (estado)
    ?children
    : <Navigate to='/'/>
}

export default RutasPublicas