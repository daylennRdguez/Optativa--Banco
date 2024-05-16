import { Route, Routes } from "react-router-dom";
import Router2 from './Router2';
import Login from '../Login';
import RutasPublicas from './RutasPublicas';
import RutasPrivadas from './RutasPrivadas';

const Router1 = () => {
    return (
        <>
            <Routes>
                <Route path='/login' element={
                    <RutasPublicas>
                        <Login/>
                    </RutasPublicas>
                }/>

                <Route path='/*' element={
                    <RutasPrivadas>
                        <Router2/>
                    </RutasPrivadas>
                }/>
            </Routes>
        </>
    )
}

export default Router1
