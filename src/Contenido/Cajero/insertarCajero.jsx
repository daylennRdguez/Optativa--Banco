import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";



const InsertarCajero = () => {

  const {register, formState:{errors}}=useForm();

  const [idCaj, setIdCaj]=useState();
  const [ubicacion, setUbicacion]=useState();
  const [noSerie, setNoSerie]=useState();
  const [calificacion, setCalificacion]=useState();

  const handleSubmit=async(e)=>{
    e.preventDefault();

    try{
      const response = await  axios.post('http://localhost:3001/cajeroInsertar', {idCaj, ubicacion, noSerie, calificacion})
      if(response.data===1){
        Swal.fire({
          icon: "success",
          title: "Cajero insertado correctamente!",
          showConfirmButton: false,
          timer: 1200
        });
      }else{
        var errorMsg
        switch(response.data){
          case -1: errorMsg = 'Ya existe un cajero con ese identificador';break;
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

        <div>
          <form onSubmit={handleSubmit}>
            <div className="formulario">
              <label htmlFor="id">Identificador:</label>
              <input id="id" placeholder="ID del cajero" autoFocus {... register('id', {required: true, maxLength:15})} type="text" value={idCaj} onChange={(e)=>{setIdCaj(e.target.value)}}/>
            </div>
            {errors.id?.type==='required' && <div className="aviso">El ID es obligatorio</div>}
            {errors.id?.type==='maxLength' && <div className="aviso">El máximo son 15 caracteres</div>}


            <div className="formulario">
              <label htmlFor="ubicacion">Ubicación:</label>
              <input id="ubicacion" placeholder="Ubicación" {... register('ubicacion', {required: true, maxLength:15})}type="text" value={ubicacion} onChange={(e)=>{setUbicacion(e.target.value)}}/>
            </div>
            {errors.ubicacion?.type==='required' && <div className="aviso">La ubicación del cajero es obligatoria</div>}
            {errors.ubicacion?.type==='maxLength' && <div className="aviso">El máximo son 15 caracteres</div>}

            <div className="formulario">
              <label htmlFor="serie">No. serie:</label>
              <input id="serie" placeholder="No. serie" {... register('serie', {required: true, maxLength:15})} type="number" value={noSerie} onChange={(e)=>{setNoSerie(e.target.value)}}/>
            </div>
            {errors.serie?.type==='required' && <div className="aviso">El No. serie es obligatorio</div>}
            {errors.serie?.type==='maxLength' && <div className="aviso">El máximo son 15 caracteres</div>}

            <div className="formulario">
              <label>Calificación</label> 
              <div className="inputsRadio">
                  <div>
                  <div>
                      <input name="calificacion" id="deficiente" type="radio"  value={calificacion} onChange={()=>{setCalificacion("Deficiente")}}/> 
                      <label>Deficiente</label>
                  </div>
                  <div>
                      <input name="calificacion" id="regular" type="radio" value={calificacion} onChange={()=>{setCalificacion("Regular")}}/> 
                      <label>Regular</label>
                  </div>
                  <div>
                      <input name="calificacion" id="eficiente" type="radio" value={calificacion}  onChange={(e)=>{setCalificacion("Eficiente")}}/> 
                      <label>Eficiente</label>
                  </div> 
                  </div>        
              </div>

            </div>

            <div>
              <button type="submit">Insertar</button>
            </div>
          </form>
        </div>

        </>
    )
}

export default InsertarCajero
