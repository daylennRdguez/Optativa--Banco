import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Contexto from "./context/Contexto";

const NavBar = () => {
    const navegacion=useNavigate();
    const {deslogearme}=useContext(Contexto);
    const login=()=>{ 
        navegacion('/login', {replace:true})
        deslogearme()
    }

    return (
        <>
        <nav>
            <h1 className='cab'>Sistema de comprobación</h1>
            <NavLink className={({isActive})=> (isActive ? "activo": null)} to='cajero'>Cajero</NavLink>
            <NavLink className={({isActive})=> (isActive ? "activo": null)} to='comprobante'>Comprobante</NavLink>
            <NavLink className={({isActive})=> (isActive ? "activo": null)} to='reporte'>Reporte</NavLink>

            
            <button onClick={login}>Log out</button>
            <NavLink className={({isActive})=> (isActive ? "activo": null)} to='usuario'>Usuario</NavLink>
        </nav>
        </>
    )
}

export default NavBar