

import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';

function Default() {
    

    return (
        <>
            <main>
                <Header/>          
                <Outlet/>
            </main>
        
        </>
    );
}

export default Default;