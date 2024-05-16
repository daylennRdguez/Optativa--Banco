
import operaciones from './pngegg.png'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import InsertarCajero from './Contenido/Cajero/insertarCajero'
import ModificarCajero from './Contenido/Cajero/modificarCajero'
import ListarCajero from './Contenido/Cajero/listarCajero'
import EliminarCajero from './Contenido/Cajero/eliminarCajero'
import InsertarComprobante from './Contenido/Comprobante/insertarComprobante'
import ListarComprobante from './Contenido/Comprobante/listarComprobante'
import ModificarComprobante from './Contenido/Comprobante/modificarComprobante'
import InsertarUsuario from './Contenido/Usuario/insertarUsuario'
import ModificarUsuario from './Contenido/Usuario/modificarUsuario'
import EliminarUsuario from './Contenido/Usuario/eliminarUsuario'
import ListarReporte from './Contenido/Reporte/listarReporte'


function ComponenteB (){
	const [location,setLocation]=useState('')
	
    const localizacion = useLocation();
    const navegacion=useNavigate();

	useEffect(()=>{
		setLocation(localizacion.pathname)
	},[localizacion])


	const llamarInsertar=()=>{
		return localizacion.pathname.includes('cajero')
		?navegacion('/cajero/insertar')
		:localizacion.pathname.includes('comprobante')
		?navegacion('/comprobante/insertar')
		:localizacion.pathname.includes('usuario')
		?navegacion('/usuario/insertar')
		:localizacion.pathname.includes('reporte')
		?navegacion('/reporte/listar')
		:null;
	}

	const llamarModificar=()=>{
		return localizacion.pathname.includes('cajero')
		?navegacion('/cajero/modificar')
		:localizacion.pathname.includes('comprobante')
		?navegacion('comprobante/modificar')
		:localizacion.pathname.includes('usuario')
		?navegacion('usuario/modificar')
		:null
	}

	const llamarEliminar=()=>{
		return localizacion.pathname.includes('cajero')
		?navegacion('/cajero/eliminar')
		:localizacion.pathname.includes('usuario')
		?navegacion('usuario/eliminar')
		:localizacion.pathname.includes('reporte')
		?navegacion('reporte/eliminar')
		:null
	}

	const llamarListar=()=>{
		return localizacion.pathname.includes('cajero')
		?navegacion('/cajero/listar')
		:localizacion.pathname.includes('comprobante')
		?navegacion('comprobante/listar')
		:localizacion.pathname.includes('reporte')
		?navegacion('reporte/listar')
		:null
	}

    
	return (
		<>
		{!location.includes('home')? 
		
		<div className="bContainer">
			<div>
				{!location.includes('reporte')?<div><button onClick={llamarInsertar}>Insertar</button></div>:null}

				{!location.includes('reporte')? <div><button onClick={llamarModificar}>Modificar</button></div>:null}

				{(!location.includes('comprobante') && !location.includes('reporte'))? <div><button onClick={llamarEliminar}>Eliminar</button></div> :null}

				{(!location.includes('usuario') && !location.includes('reporte') )? <div><button onClick={llamarListar}>Listar</button></div>:null}

			</div>

			<div>
			{
				localizacion.pathname.includes('cajero/insertar')
				?<InsertarCajero/>
				:localizacion.pathname.includes('cajero/modificar')
				?<ModificarCajero/>
				:localizacion.pathname.includes('cajero/eliminar')
				?<EliminarCajero/>
				:localizacion.pathname.includes('cajero/listar')
				?<ListarCajero/>

				:localizacion.pathname.includes('comprobante/insertar')
				?<InsertarComprobante/>
				:localizacion.pathname.includes('comprobante/modificar')
				?<ModificarComprobante/>
				:localizacion.pathname.includes('comprobante/listar')
				?<ListarComprobante/>

				:localizacion.pathname.includes('usuario/insertar')
				?<InsertarUsuario/>
				:localizacion.pathname.includes('usuario/modificar')
				?<ModificarUsuario/>
				:localizacion.pathname.includes('usuario/eliminar')
				?<EliminarUsuario/>
				
				:localizacion.pathname.includes('reporte/listar')
				?<ListarReporte/>
				:null
			}
			</div>

			<div>
			<img src={operaciones} alt="Operaciones" />
			</div>
																	
		</div>:null}
		</>
	)
}

export default ComponenteB

