import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Workflow from '../components/ui/Workflow'
import Navbar from '../components/ui/Navbar'
import PurityManagement from '../components/PurityManagement'
import Ratemanagement from '../components/Ratemanagement'
import RateHistory from '../components/RateHistory'


function Router() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path='/' element={<PurityManagement />} />
                <Route path='/ratehistory' element={<RateHistory />} />
                <Route path='/ratemanagement' element={<Ratemanagement />} />
                <Route />
            </Routes>
            <Workflow />
        </>
    )
}

export default Router
