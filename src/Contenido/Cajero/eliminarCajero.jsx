import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function EliminarCajero() {

    const [idCaj, setIdCaj]=useState();
    const [ubicacion, setUbicacion]=useState();
    const [noSerie, setNoSerie]=useState();
    const [calificacion, setCalificacion]=useState();


    const busqueda=async(e)=>{
      e.preventDefault();
        
      try{
        const response = await axios.post('http://localhost:3001/cajeroBuscar', {idCaj}) 
          
        if(response.data===0){
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: 'No existe un cajero con ese identificador',
          })
          setUbicacion('')
          setNoSerie('')
          setCalificacion('')
        }else{
              Swal.fire({
                icon: "success",
                title: "Cajero encontrado",
                showConfirmButton: false,
                timer: 1200
              });     
           setUbicacion(response.data[0].ubicacion)
           setNoSerie(response.data[0].noSerie)
           setCalificacion(response.data[0].Calificacion)

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

        var response = await axios.post('http://localhost:3001/cajeroBuscar', {idCaj}) 
          
        if(response.data===0){
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: 'No existe un cajero con ese identificador',
          })
          setUbicacion('')
          setNoSerie('')
          setCalificacion('')
        }else{
          response=await axios.put('http://localhost:3001/cajeroEliminar',{idCaj})
          
          if(response.data===1){
              Swal.fire({
                icon: "success",
                title: "Cajero eliminado correctamente!",
                showConfirmButton: false,
                timer: 1200
              });
                setIdCaj('')
                setUbicacion('')
                setNoSerie('')
                setCalificacion('')
            }else{
              var errorMsg
              switch(response.data){
                case 0: errorMsg='Especifique el cajero a eliminar';break;
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
                    <input id="buscar" name="buscar" placeholder="Ingrese el identificador del cajero a buscar" type="search" value={idCaj} onChange={(e)=>{setIdCaj(e.target.value)}} autoFocus/>
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
              <label htmlFor="ubicacion">Ubicación:</label>
              <input id="ubicacion" placeholder="Ubicación"  type="" value={ubicacion} onChange={(e)=>{setUbicacion(e.target.value)}} readOnly/>
            </div>


            <div className="formulario">
              <label htmlFor="serie">No. serie:</label>
              <input id="serie" placeholder="No. serie"  type="number" value={noSerie} onChange={(e)=>{setNoSerie(e.target.value)}} readOnly/>
            </div>

            <div className="formulario">
              <label htmlFor="calificacion">Calificación:</label>
              <input id="calificacion" placeholder="Calificación" type="text" value={calificacion} onChange={(e)=>{setCalificacion(e.target.value)}} readOnly/>
            </div>

            <div>
            <button>Eliminar</button>    
            </div>
          </form>
        </div>



        </>
    )
}

export default EliminarCajero
