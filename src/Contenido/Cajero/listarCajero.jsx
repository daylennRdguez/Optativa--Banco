import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import {Table, TableHead, TableBody, TableRow, TableCell, Button} from 'evergreen-ui'

const ListarCajero = () => {

    const [result, setResult]=useState([]);

    const correo='dptotecnico@bancondc.com';

    const listar=async(e)=>{
        e.preventDefault();
        try{
        const response = await axios.get('http://localhost:3001/cajeroListar')
            if(response.data===0){
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `No existe ningún cajero reportado`,
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
        var id_Caj;
        id_Caj=e;
        console.log(id_Caj)
        console.log(e)

        try{
        const response= await axios.post('http://localhost:3001/reporteCajInsertar', {correo, id_Caj}) 
        
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
            <button onClick={listar}>Listar cajero</button>      
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell width={300}>ID cajero</TableCell>
                            <TableCell>Ubicación</TableCell>
                            <TableCell>No. Serie</TableCell>
                            <TableCell>Calificación</TableCell>
                            <TableCell>Acción</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody height={240}>{result.map((cajero, index)=>{
                                return <TableRow key={index}>
                                    <TableCell>{cajero.idCaj}</TableCell>
                                    <TableCell>{cajero.ubicacion}</TableCell>
                                    <TableCell>{cajero.noSerie}</TableCell>
                                    <TableCell>{cajero.Calificacion}</TableCell>
                                    <TableCell>
                                        <Button onClick={()=>{emergente(cajero.idCaj)}}>Reportar</Button>
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

export default ListarCajero
