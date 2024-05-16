import { Route, Routes } from "react-router-dom"
import { Navigate } from "react-router-dom"
import InsertarUsuario from "./insertarUsuario"
import ModificarUsuario from "./modificarUsuario"
import EliminarUsuario from "./eliminarUsuario"

const Usuario = () => {
    return (
        <>
        <Routes>
            <Route path="/insertar" element={<InsertarUsuario/>}/>
            <Route path="/modificar" element={<ModificarUsuario/>}/>
            <Route path="/eliminar" element={<EliminarUsuario/>}/>
            <Route path="/*" element={<Navigate to={'../insertar'}/>}/>
        </Routes>
        </>
    )
}

export default Usuario
