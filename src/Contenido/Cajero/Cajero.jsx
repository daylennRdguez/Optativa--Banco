import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import InsertarCajero from './insertarCajero';
import ListarCajero from './listarCajero';
import ModificarCajero from './modificarCajero';
import EliminarCajero from './eliminarCajero';

const Cajero = () => {


    return (
        <Routes>
            <Route path='/insertar' element={<InsertarCajero/>}/>
            <Route path='/modificar' element={<ModificarCajero/>}/>
            <Route path='/eliminar' element={<EliminarCajero/>}/>
            <Route path='/listar' element={<ListarCajero/>}/>
            <Route path="/*" element={<Navigate to={'../insertar'}/>}/>
        </Routes>

   
  
        
    )
}

export default Cajero;