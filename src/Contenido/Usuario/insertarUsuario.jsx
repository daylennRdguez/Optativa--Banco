import { useForm } from "react-hook-form"
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const InsertarUsuario = () => {

  const {register, formState:{errors}, }=useForm();

  const [idUsuario, setIdUsuario]=useState();
  const [nombre, setNombre]=useState();
  const [apellidos, setApellidos]=useState();
  const [cargo, setCargo]=useState();
  const [contrasenna, setContrasenna]=useState();

  const handleSubmit=async(e)=>{
    e.preventDefault();

    try{
      const response = await axios.post('http://localhost:3001/usuarioInsertar', {idUsuario, nombre, apellidos, cargo, contrasenna})

      if(response.data===1){
        Swal.fire({
          icon: "success",
          title: "Usuario insertado correctamente!",
          showConfirmButton: false,
          timer: 1200
        });
      }else{
        var errorMsg
        switch(response.data){
          case -1: errorMsg = 'Ya existe un usuario con ese nombre de usuario';break;
          case -2: errorMsg = 'Ya existe un usuario con ese nombre';break;
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
        <div>
          <form onSubmit={handleSubmit}>
            <div className="formulario">
              <label htmlFor="id">Nombre de Usuario:</label>
              <input id="usuario" placeholder="Nombre de usuario" autoFocus type="text" value={idUsuario} onChange={(e)=>{setIdUsuario(e.target.value)}}/>


            </div>
            {errors.nombre?.type==='required' && <div className="aviso">El nombre es obligatorio</div>}
            {errors.nombre?.type==='maxLength' && <div className="aviso">El máximo son 15 caracteres</div>}

          <div className="formulario">
              <label htmlFor="nombre">Nombre:</label>
              <input id="nombre" placeholder="Nombre"{... register('nombre', {required: true, maxLength:15})} type="text" value={nombre} onChange={(e)=>{setNombre(e.target.value)}}/>
          </div>

            <div className="formulario">
              <label htmlFor="apellido">Apellidos:</label>
              <input id="apellido" placeholder="Apellidos" {... register('apellido', {required: true, maxLength:15})} type="text" value={apellidos} onChange={(e)=>{setApellidos(e.target.value)}}/>
            </div>
            {errors.apellido?.type==='required' && <div className="aviso">El apellido es obligatorio</div>}
            {errors.apellido?.type==='maxLength' && <div className="aviso">El máximo son 15 caracteres</div>}

            <div className="formulario">
              <label htmlFor="cargo">Cargo:</label>
              <input id="cargo" placeholder="Cargo" {... register('cargo', {required: true, maxLength:11, minLength:11})} type="text" value={cargo} onChange={(e)=>{setCargo(e.target.value)}}/>
            </div>
            {errors.ci?.type==='required' && <div className="aviso">El CI es obligatorio</div>}
            {errors.ci?.type==='maxLength' && <div className="aviso">Debe introducir 11 caracteres</div>}
            {errors.ci?.type==='minLength' && <div className="aviso">Debe introducir 11 caracteres</div>}

            <div className="formulario">
              <label htmlFor="contrasenna">Contraseña:</label>
              <input id="contrasenna" placeholder="Contraseña" {... register('contrasenna', {required: true, minLength:4})} type="text" onChange={(e)=>{setContrasenna(e.target.value)}}/>
            </div>
            {errors.cargo?.type==='required' && <div className="aviso">El cargo es obligatorio</div>}
            {errors.cargo?.type==='minLength' && <div className="aviso">El mínimo son 4 caracteres</div>}


            <div>
              <button>Insertar</button>
            </div>
          </form>
        </div>
      
        </>
    )
  }

export default InsertarUsuario