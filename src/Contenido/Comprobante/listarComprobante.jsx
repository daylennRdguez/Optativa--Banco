import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import {Table, TableHead, TableBody, TableRow, TableCell, Button} from 'evergreen-ui'

const ListarComprobante = () => {

    const [result, setResult]=useState([]);

    const correo='dptotecnico@bancondc.com';

    const listar=async(e)=>{
        e.preventDefault();
        try{
        const response = await axios.get('http://localhost:3001/comprobanteListar')
            if(response.data===0){
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `No existe ningún comprobante`,
                }) 
            }else{
                setResult(response.data);
            }
        }catch(error){
            var errorMsg;
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: errorMsg,
            }) 
            console.log(error)
        }
    }

    const emergente = async(e)=>{
        var id_Comp;
        id_Comp=e;
        console.log(id_Comp)
        console.log(e)

        try{
        const response= await axios.post('http://localhost:3001/reporteCompInsertar', {correo, id_Comp}) 
        
        if(response.data===1){
        Swal.fire({
            icon: "success",
            title: "Reporte enviado correctamente!",
            showConfirmButton: false,
            timer: 1200
          });            
        }else{
            var errorMsg
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
              text: 'Ha ocurrido un error',
              })
        }
    }

    return (
        <>
        <div className="tablaCajero">
            <button onClick={listar}>Listar comprobantes</button>      
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell width={200}>ID cajero</TableCell>
                            <TableCell>Fecha</TableCell>
                            <TableCell>No. Transacción</TableCell>
                            <TableCell>Acción</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody height={240}>{result.map((cajero, index)=>{
                                return <TableRow key={index}>
                                    <TableCell>{cajero.idComp}</TableCell>
                                    <TableCell>{cajero.fecha}</TableCell>
                                    <TableCell>{cajero.noTrans}</TableCell>
                                    <TableCell>
                                        <Button onClick={()=>{emergente(cajero.idComp)}}>Reportar</Button>
                                    </TableCell>
                                </TableRow>
                                })
                            }
                        </TableBody>
                    </Table>
            </div>
        </>
    )
}

export default ListarComprobante