import operaciones from './pngegg.png'

const Home = () => {
    return (
        <>
        <div className='hContainer'>
        <div className='cuerpo'>
        <h2>Guía de inicio</h2>
        <p className='guide'>
            El Sistema de Comprobación facilita el análisis del comportamiento de los cajeros automáticos en base a la información presentada en los comprobantes de las operaciones realizadas en ellos.
            Pueden gestionarse cajeros y comprobantes mediante sus respectivas opciones.           
            </p>         
        </div>  
        <img src={operaciones} alt="Operaciones" />          
        </div>
        </>
    )
}

export default Home
