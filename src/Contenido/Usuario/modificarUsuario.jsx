import { useForm } from "react-hook-form";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const ModificarUsuario = () => {

  const {register, formState:{errors}}=useForm();

  const [idUsuario, setIdUsuario]=useState();
  const [nombre, setNombre]=useState();
  const [apellidos, setApellidos]=useState();
  const [cargo, setCargo]=useState();
  const [contrasenna, setContrasenna]=useState();

  
  const busqueda=async(e)=>{
    e.preventDefault();

    try{
      const response =await axios.post('http://localhost:3001/usuarioBuscar', {idUsuario})
      if(response.data===0){
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `No existe ningún usuario llamado ${idUsuario}`,
        })
      }else{
        Swal.fire({
          icon: "success",
          title: "Usuario encontrado",
          showConfirmButton: false,
          timer: 1200
        });  
        setNombre(response.data[0].nombre)
        setApellidos(response.data[0].apellidos)
        setCargo(response.data[0].cargo)
        setContrasenna(response.data[0].contrasenna)
      }
    }catch(error){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ha ocurrido un error",
      }) 
    }
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();

    try{
      const response=await axios.put('http://localhost:3001/usuarioModificar', {idUsuario, nombre, apellidos, cargo, contrasenna})
      if(response.data===1){

        Swal.fire({
          icon: "success",
          title: "Cajero modificado correctamente!",
          showConfirmButton: false,
          timer: 1200
        });
      }else{
        var errorMsg
        switch(response.data){
          case -1: errorMsg = 'Ya existe un usuario con ese nombre de usuario';break;
          case -3: errorMsg = 'No deben existir campos vacíos';break;
          default: errorMsg = response.data
        }
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: errorMsg,
        })
      }
    }catch(error){
      console.log(error)
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ha ocurrido un error",
        })
    }
  }

    return (
        <>
        <div >
            <form onSubmit={busqueda}>
                <div className="busqueda">
                <div>
                    <input id="buscar" name="buscar" placeholder="Buscar" type="search" {... register('buscar', {required:true, maxLength:15})} value={idUsuario} onChange={(e)=>{setIdUsuario(e.target.value)}} autoFocus/>
                </div>
                {errors.buscar?.type==='required' && <div className="aviso">¿Qué desea buscar?</div>}
                {errors.buscar?.type==='maxLength' && <div className="aviso">El máximo son 15 caracteres</div>}
                <div>
                    <button>Buscar</button>
                </div>                    
                </div>
            </form>             
        </div>

        <div>
          <form onSubmit={handleSubmit}>
            <div className="formulario">
              <label htmlFor="id">Nombre de usuario:</label>
              <input id="id" placeholder="Nombre de usuario" {... register('idUsuario', {required: true, maxLength:15})} value={idUsuario} onChange={(e)=>{setIdUsuario(e.target.value)}}/>
            </div>
            {errors.nombre?.type==='required' && <div className="aviso">El nombre es obligatorio</div>}
            {errors.nombre?.type==='maxLength' && <div className="aviso">El máximo son 15 caracteres</div>}

            <div className="formulario">
              <label htmlFor="id">Nombre:</label>
              <input id="nombre" placeholder="Nombre" {... register('nombre', {required: true, maxLength:15})} value={nombre} onChange={(e)=>{setNombre(e.target.value)}}/>
            </div>
            {errors.nombre?.type==='required' && <div className="aviso">El nombre es obligatorio</div>}
            {errors.nombre?.type==='maxLength' && <div className="aviso">El máximo son 15 caracteres</div>}


            <div className="formulario">
              <label htmlFor="apellido">Apellido:</label>
              <input id="apellido" placeholder="apellido" {... register('apellido', {required: true, maxLength:15})} value={apellidos} onChange={(e)=>{setApellidos(e.target.value)}}/>
            </div>
            {errors.apellido?.type==='required' && <div className="aviso">El apellido es obligatorio</div>}
            {errors.apellido?.type==='maxLength' && <div className="aviso">El máximo son 15 caracteres</div>}


            <div className="formulario">
              <label htmlFor="cargo">Cargo:</label>
              <input id="cargo" placeholder="Cargo" {... register('cargo', {required: true, minLength:4})} value={cargo} onChange={(e)=>{setCargo(e.target.value)}}/>
            </div>
            {errors.cargo?.type==='required' && <div className="aviso">El cargo es obligatorio</div>}
            {errors.cargo?.type==='minLength' && <div className="aviso">El mínimo son 4 caracteres</div>}

            <div className="formulario">
              <label htmlFor="contrasenna">Contraseña:</label>
              <input id="contraseña" placeholder="Contrasenna" {... register('contrasenna', {required: true, maxLength:11, minLength:11})} value={contrasenna} onChange={(e)=>{setContrasenna(e.target.value)}}/>
            </div>
            {errors.ci?.type==='required' && <div className="aviso">El CI es obligatorio</div>}
            {errors.ci?.type==='maxLength' && <div className="aviso">Debe introducir 11 caracteres</div>}
            {errors.ci?.type==='minLength' && <div className="aviso">Debe introducir 11 caracteres</div>}

            <div>
              <button>Modificar</button>
            </div>
          </form>
        </div>

        </>
    )
}

export default ModificarUsuario