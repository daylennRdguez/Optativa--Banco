import { Route, Routes } from "react-router-dom"
import { Navigate } from "react-router-dom"

const Reporte = () => {
    return (
        <>
        <Routes>
            <Route path="/*" element={<Navigate to={'../listar'}/>}/>
        </Routes>
        </>
    )
}

export default Reporte
