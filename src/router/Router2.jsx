import { Route, Routes } from "react-router-dom";
import Home from '../Home';
import Cajero from './../Contenido/Cajero/Cajero';
import Comprobante from './../Contenido/Comprobante/Comprobante';
import Usuario from './../Contenido/Usuario/Usuario';
import Reporte from './../Contenido/Reporte/Reporte';
import ComponenteB from '../ComponenteB';
import NavBar from './../navBar';

const Router2 = () => {
    return (
        <>
            <NavBar/>
            <Routes>
                <Route path='/home' element={<Home/>}/>
                <Route path='cajero' element={<Cajero/>}/>
                <Route path='comprobante' element={<Comprobante/>}/>
                <Route path='reporte' element={<Reporte/>}/>
                <Route path='usuario' element={<Usuario/>}/>
            </Routes>
            <ComponenteB/>

        </>
    )
}

export default Router2;
