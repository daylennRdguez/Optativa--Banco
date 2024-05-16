import { useForm } from "react-hook-form"
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";

const InsertarComprobante = () => {

  const {register, formState:{errors}}=useForm();

  const [idComp, setIdComp]= useState();
  const [fecha, setFecha]=useState();
  const [noTrans, setNoTrans]= useState();

  const handleSubmit=async(e)=>{
    e.preventDefault();

    try{
      const response=await axios.post('http://localhost:3001/comprobanteInsertar', {idComp, fecha, noTrans})
      if(response.data===1){
        Swal.fire({
          icon:"success",
          title:"Comprobante insertado correctamente!",
          showConfirmButton: false,
          timer: 1200
        });
      }else{
        var errorMsg
        switch (response.data) {
          case -1: errorMsg='Ya existe un comprobante con ese identificador';break;
          case -2: errorMsg='Ya existe un comprobante con ese número de transacción';break;
          case -3: errorMsg='No deben existir campos vacíos';break;
          case -4: errorMsg='Debe introducir agregar un mes en el campo Fecha';break;
          case -5: errorMsg='Debe introducir el número de transacción';break;
          default: errorMsg =response.data
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
              <input id="id" placeholder="ID del comprobante" autoFocus {... register('id', {required: true, maxLength:15})} value={idComp} onChange={(e)=>{setIdComp(e.target.value)}}/>
            </div>
            {errors.id?.type==='required' && <div className="aviso">El ID es obligatorio</div>}
            {errors.id?.type==='maxLength' && <div className="aviso">El máximo son 15 caracteres</div>}


            <div className="formulario">
              <label htmlFor="fecha">Fecha:</label>
              <input id="fecha" placeholder="Mes" type="text" {... register('fecha', {required: true})} value={fecha} onChange={(e)=>{setFecha(e.target.value)}}/>
            </div>
            {errors.fecha?.type==='required' && <div className="aviso">La fecha es obligatoria</div>}

            <div className="formulario">
              <label htmlFor="transaccion">No. transacción:</label>
              <input id="transaccion" placeholder="No. transacción" {... register('transaccion', {required: true, maxLength:15})} value={noTrans} onChange={(e)=>{setNoTrans(e.target.value)}}/>
            </div>
            {errors.transaccion?.type==='required' && <div className="aviso">El No. transaccion es obligatorio</div>}
            {errors.transaccion?.type==='maxLength' && <div className="aviso">El máximo son 15 caracteres</div>}


            <div>
              <button>Insertar</button>
            </div>
          </form>
        </div>

            
        </>
    )
}

export default InsertarComprobante