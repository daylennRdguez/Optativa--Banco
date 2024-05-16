import { useNavigate } from "react-router-dom";
import Banco from './Banco 1.png';
import axios from 'axios';
import Swal from 'sweetalert2'
import { useContext, useState } from "react";
import Contexto from './context/Contexto'


const Login = () => {
    const navegacion=useNavigate();
    const {logearme}=useContext(Contexto);
    const [idUsuario, setIdUsuario]= useState('');
    const [contrasenna, setContrasenna]= useState('');

    const login=()=>{
        navegacion('/home',{replace: true}) 
        logearme('admin')
    }
   

    const handleLogin = async(e)=>{
        e.preventDefault();
         
        try{
            const response = await axios.post('http://localhost:3001/validatePassword', {idUsuario, contrasenna}) 
                if(response.data===1){             
               Swal.fire({
                    icon: "success",
                    title: "Datos correctos",
                    showConfirmButton: false,
                    timer: 1200
                  });  
               login()
                }else if(response.data===0){
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Datos Incorrectos",
                      })     
                }            
       }catch(error){ 
            Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Ha ocurrido un error",
                  })
            
        }
    }

        return (
            <>
            <div className="content">
                <div>
                <div className="header">
                  <h1 className="banco">Banco Nacional de Cuba</h1>  
                </div>
                
                <div className="formu">
                <form  className="login" onSubmit={handleLogin}>
                    <div className="abajo">
                    <div className="datos">
                        <label htmlFor="idUsuario">Usuario:</label>
                        <input type="text" id="idUsuario" value={idUsuario} onChange={(e)=>{setIdUsuario(e.target.value)}}/>
                    </div>

                    <div className="datos">
                        <label htmlFor="contrasenna">Contraseña:</label>
                        <input type="password" id="contrasenna" value={contrasenna} onChange={(e)=>{setContrasenna(e.target.value)}}/>
                    </div>                        
                    </div>


                    <button type="submit">Iniciar Sesión</button>
                </form>

                <img src={Banco} alt="Banco" className="caja"></img>
                </div>
                </div>
            </div>
            </>
        )
    }
    
    export default Login
    