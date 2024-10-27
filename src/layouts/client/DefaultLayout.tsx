import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
export const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
    return <div>
        <div className='h-[78px]'>
            <Navbar />
        </div>
        {children}
        <Footer />
    </div>
}