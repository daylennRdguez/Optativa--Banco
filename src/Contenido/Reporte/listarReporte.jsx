import {useState } from "react"
import axios from "axios";
import Swal from "sweetalert2";
import {Table, TableHead, TableBody, TableRow, TableCell, Button} from 'evergreen-ui'

const ListarReporte = () => {

    const [datosCaj, setDatosCaj]=useState([]);
    const [datosComp, setDatosComp]=useState([]);


    const reporteCaj=async(e)=>{
        e.preventDefault();
        try{
        const response = await axios.get('http://localhost:3001/reporteCajListar')
            if(response.data===0){
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `No existe ningún cajero reportado`,
                  }) 
            }else{
                setDatosCaj(response.data);
                
            }
        }catch(error){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Ha ocurrido un error",
              }) 
              console.log(error)
        }
    }

    const reporteComp=async(e)=>{
        e.preventDefault();
        try{
        const response = await axios.get('http://localhost:3001/reporteCompListar')
            if(response.data===0){
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `No existe ningún comprobante reportado`,
                  }) 
            }else{
                setDatosComp(response.data);
                
            }
        }catch(error){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Ha ocurrido un error",
              }) 
              console.log(error)
        }
    }


    const eliminarCaj=async(e)=>{
        var idRepCaj;
        idRepCaj=e;
        console.log(e);
        console.log(idRepCaj)

        try{
            const response = await axios.put('http://localhost:3001/reporteCajEliminar', {idRepCaj})
            if(response.data===1){
                Swal.fire({
                  icon: "success",
                  title: "Reporte eliminado correctamente!",
                  showConfirmButton: false,
                  timer: 1200
                });
            }else{
                var errorMsg
                switch(response.data){
                  case 0: errorMsg='El reporte no pudo ser eliminado ';break;
                  default: errorMsg=response.data
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
    const eliminarComp=async(e)=>{
        var idRepComp;
        idRepComp=e;
        console.log(idRepComp)

        try{
            const response = await axios.put('http://localhost:3001/reporteCompEliminar', {idRepComp})
            if(response.data===1){
                Swal.fire({
                  icon: "success",
                  title: "Reporte eliminado correctamente!",
                  showConfirmButton: false,
                  timer: 1200
                });
            }else{
                var errorMsg
                switch(response.data){
                  case 0: errorMsg='El reporte no pudo ser eliminado ';break;
                  default: errorMsg=response.data
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
        <div className="tablas">
            <div className="tablaCajero">
                <button onClick={reporteCaj}>Listar cajero</button>      
                    <Table width={500}>
                        <TableHead>
                            <TableRow>
                                <TableCell width={200}>ID reporte</TableCell>
                                <TableCell flexBasis={200}>Correo</TableCell>
                                <TableCell>ID del cajero</TableCell>
                                <TableCell>Acción</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody height={240}>
                            {datosCaj.map((reporte, index)=>{
                                return <TableRow key={index}>
                                    <TableCell>{reporte.idRepCaj}</TableCell>
                                    <TableCell flexBasis={200}>{reporte.correo}</TableCell>
                                    <TableCell>{reporte.id_Caj}</TableCell>
                                    <TableCell>
                                        <Button onClick={()=>{eliminarCaj(reporte.idRepCaj)}}>Eliminar</Button>
                                    </TableCell>
                                </TableRow>
                                })
                            }
                        </TableBody>
                    </Table>
            </div>


            <div className="tablaComp">
                <button onClick={reporteComp}>Listar comprobante</button>      
                    <Table width={500}>
                        <TableHead>
                            <TableRow>
                                <TableCell width={200}>ID reporte</TableCell>
                                <TableCell flexBasis={200}>Correo</TableCell>
                                <TableCell>ID del comprobante</TableCell>
                                <TableCell>Acción</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody height={240}>
                            {datosComp.map((reporte, index)=>{
                                return <TableRow key={index}>
                                    <TableCell>{reporte.idRepComp}</TableCell>
                                    <TableCell flexBasis={200}>{reporte.correo}</TableCell>
                                    <TableCell>{reporte.id_Comp}</TableCell>
                                    <TableCell>
                                        <Button onClick={()=>{eliminarComp(reporte.idRepComp)}}>Eliminar</Button>
                                        
                                    </TableCell>
                                </TableRow>
                                })
                            }
                        </TableBody>
                    </Table>
            </div>
        </div>

        </>
    )
}

export default ListarReporte