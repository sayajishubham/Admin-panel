import React from 'react'
import { Route, Routes } from "react-router"

import Signup from '../Page/Signup'
import Signin from '../Page/Signin'
import Dashboard from '../Page/Dashboard'
import Addherovillain from '../Page/Addherovillains'
import Updatevillains from '../Page/Updatevillains'
function Mainroutes() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Dashboard />}></Route>
        <Route path='/Signup' element={<Signup />}></Route>
        <Route path='/Signin' element={<Signin />}></Route>
        <Route path='/Addherovillains' element={<Addherovillain />}></Route>
        <Route path='/Updatevillains/:id' element={<Updatevillains/>}></Route>

      </Routes>

    </div>
  )
}

export default Mainroutes
