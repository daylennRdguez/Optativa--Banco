import Swal from "sweetalert2";
import axios from "axios";
import { useState } from "react";


const EliminarUsuario = () => {

    const [idUsuario, setIdUsuario]=useState('');
    const [nombre, setNombre]=useState('');
    const [apellidos, setApellidos]=useState('');
    const [cargo, setCargo]=useState('');
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

        var response = await axios.post('http://localhost:3001/usuarioBuscar', {idUsuario}) 
          
        if(response.data===0){
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: 'No está registrado ese nombre de usuario',
          })
          setNombre('')
          setApellidos('')
          setCargo('')
          setContrasenna('')
        }else{
          response=await axios.put('http://localhost:3001/usuarioEliminar',{idUsuario})
          
          if(response.data===1){
              Swal.fire({
                icon: "success",
                title: "Usuario eliminado correctamente!",
                showConfirmButton: false,
                timer: 1200
              });
                setIdUsuario('')
                setNombre('')
                setApellidos('')
                setCargo('')
                setContrasenna('')
            }else{
              var errorMsg
              switch(response.data){
                case 0: errorMsg='Especifique el usuario a eliminar';break;
                default: errorMsg=response.data
              }
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: errorMsg,
              })
            }     
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
                    <input id="buscar" name="buscar" placeholder="Buscar" type="search"  value={idUsuario} onChange={(e)=>{setIdUsuario(e.target.value)}} autoFocus/>
                </div>

                <div>
                    <button>Buscar</button>
                </div>                    
                </div>
            </form>             
        </div>


        <div>
          <form onSubmit={handleSubmit}>

            <div className="formulario">
              <label htmlFor="id">Nombre:</label>
              <input id="nombre" placeholder="Nombre" value={nombre} onChange={(e)=>{setNombre(e.target.value)}} readOnly/>
            </div>



            <div className="formulario">
              <label htmlFor="apellido">Apellido:</label>
              <input id="apellido" placeholder="apellido" value={apellidos} onChange={(e)=>{setApellidos(e.target.value)}} readOnly/>
            </div>



            <div className="formulario">
              <label htmlFor="cargo">Cargo:</label>
              <input id="cargo" placeholder="Cargo" value={cargo} onChange={(e)=>{setCargo(e.target.value)}} readOnly/>
            </div>

            <div className="formulario">
              <label htmlFor="contrasenna">Contraseña:</label>
              <input id="contraseña"  type="password"
              placeholder="Contrasenna" value={contrasenna} onChange={(e)=>{setContrasenna(e.target.value)}} readOnly/>
            </div>


            <div>
              <button>Eliminar</button>
            </div>
          </form>
        </div>
        </>
    )
}

export default EliminarUsuario