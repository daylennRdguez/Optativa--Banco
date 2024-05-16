import { Routes, Route } from "react-router-dom";
import {Navigate} from "react-router-dom"
import InsertarComprobante from './insertarComprobante';
import ModificarComprobante from './modificarComprobante';
import ListarComprobante from './listarComprobante';

function Comprobante() {
    return (
        <>
        <Routes>
            <Route path="/insertar" element={<InsertarComprobante/>}/>
            <Route path="/modificar" element={<ModificarComprobante/>}/>
            <Route path="/listar" element={<ListarComprobante/>}/>
            <Route path="/*" element={<Navigate to={'../insertar'}/>}/>
        </Routes>


        </>
    )
}

export default Comprobante
