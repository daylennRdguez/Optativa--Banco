import { useForm } from "react-hook-form"
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ModificarComprobante = () => {

  const {register, formState:{errors}}=useForm();

  const [idComp, setIdComp]=useState();
  const [fecha, setFecha]=useState();
  const [noTrans, setNoTrans]=useState();

  const busqueda=async(e)=>{
    e.preventDefault();

    try{
      const response=await axios.post('http://localhost:3001/comprobanteBuscar', {idComp})
        if(response.data===0){
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `No existe ningún comprobante con identificador ${idComp}`,
          })   
        }else{
          Swal.fire({
            icon: "success",
            title: "Comprobante encontrado",
            showConfirmButton: false,
            timer: 1200
          });  
          setFecha(response.data[0].fecha)
          setNoTrans(response.data[0].noTrans)
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
        const response=await axios.put('http://localhost:3001/comprobanteModificar', {idComp, fecha, noTrans})
        if(response.data===1){
          Swal.fire({
            icon: "success",
            title: "Comprobante modificado correctamente!",
            showConfirmButton: false,
            timer: 1200
          });
        }else{
          var errorMsg
          switch(response.data){
            case -2: errorMsg = 'Ya existe un comprobante con ese número de serie';break;
            case -3: errorMsg = 'No deben existir campos vacíos';break;
            case -4: errorMsg = 'No deben existir campos vacíos';break;
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
                    <input id="buscar" name="buscar" placeholder="Ingrese el ID del comprobante" type="search" {... register('buscar', {required:true, maxLength:15})} value={idComp} onChange={(e)=>{setIdComp(e.target.value)}} autoFocus/>
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
              <input id="id" placeholder="ID del comprobante" {... register('id', {required: true, maxLength:15})}type="text" value={idComp} onChange={(e)=>{setIdComp(e.target.value)}}/>
            </div>
            {errors.id?.type==='required' && <div className="aviso">El ID es obligatorio</div>}
            {errors.id?.type==='maxLength' && <div className="aviso">El máximo son 15 caracteres</div>}


            <div className="formulario">
              <label htmlFor="fecha">Fecha:</label>
              <input id="text" placeholder="Fecha" type="text" {... register('fecha', {required: true})} value={fecha} onChange={(e)=>{setFecha(e.target.value)}}/>
            </div>
            {errors.fecha?.type==='required' && <div className="aviso">La fecha es obligatoria</div>}

            <div className="formulario">
              <label htmlFor="transaccion">No. transacción:</label>
              <input id="transaccion" placeholder="No. transacción" {... register('transaccion', {required: true, maxLength:15})} value={noTrans} onChange={(e)=>{setNoTrans(e.target.value)}}/>
            </div>
            {errors.transaccion?.type==='required' && <div className="aviso">El No. transaccion es obligatorio</div>}
            {errors.transaccion?.type==='maxLength' && <div className="aviso">El máximo son 15 caracteres</div>}


            <div>
              <button>Modificar</button>
            </div>
          </form>
        </div>
        </>
    )
}

export default ModificarComprobante