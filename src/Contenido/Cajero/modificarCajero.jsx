import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ModificarCajero = () => {

    const {register, formState:{errors}}=useForm();

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
                    text: `No existe ningún cajero con identificador ${idCaj}`,
                  })     
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
        const response = await  axios.put('http://localhost:3001/cajeroModificar', {idCaj, ubicacion, noSerie, calificacion})
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
            case -2: errorMsg = 'Ya existe un cajero con ese número de serie';break;
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
                    <input id="buscar" name="buscar" placeholder="Ingrese el ID del cajero" type="search"  {... register('buscar', {required:true, maxLength:15})} value={idCaj} onChange={(e)=>{setIdCaj(e.target.value)}}autoFocus/>
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
              <label htmlFor="id">Identificador:</label>
              <input id="id" placeholder="ID del cajero" type="text" value={idCaj} onChange={(e)=>{setIdCaj(e.target.value)}} />
            </div>



            <div className="formulario">
              <label htmlFor="ubicacion">Ubicación:</label>
              <input id="ubicacion" placeholder="Ubicación" onChange={(e)=>{setUbicacion(e.target.value)}} />
            </div>


            <div className="formulario">
              <label htmlFor="serie">No. serie:</label>
              <input id="serie" placeholder="No. serie" {... register('serie', {maxLength:15})} type="number" value={noSerie} onChange={(e)=>{setNoSerie(e.target.value)}} />
            </div>
            {errors.serie?.type==='maxLength' && <div className="aviso">El máximo son 15 caracteres</div>}

            <div className="formulario">
              <label>Calificación</label> 
              <div className="inputsRadio">
                  <div>
                  <div>
                      <input name="calificacion" id="deficiente" type="radio"  value={calificacion} onChange={()=>{setCalificacion("Deficiente")}}checked={calificacion==="Deficiente"} 
                      /> 
                      <label>Deficiente</label>
                  </div>
                  <div>
                      <input name="calificacion" id="regular" type="radio"  value={calificacion} onChange={()=>{setCalificacion("Regular")}} checked={calificacion==="Regular"}/> 
                      <label>Regular</label>
                  </div>
                  <div>
                      <input name="calificacion" id="eficiente" type="radio"  value={calificacion}  onChange={()=>{setCalificacion("Eficiente")}}checked={calificacion==="Eficiente"}/> 
                      <label>Eficiente</label>
                  </div> 
                  </div>        
              </div>

            </div>

            <div>
              <button>Modificar</button>
            </div>
          </form>
        </div>




        </>
    )
}

export default ModificarCajero