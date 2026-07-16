import { useState } from 'react'
import { Routes, Route } from 'react-router'
import Home from './components/Home'
import Create from './components/Create'
import Edit from './components/Edit'
import Delete from './components/Delete'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Landing from './components/Landing'
import Register from './components/Register'
import Login from './components/Login'

function App() {
  // const [isSideBarActive, setIsSideBarActive] = useState(false);
  return (
    <div>
      <Routes>
        <Route path='' element={<Landing />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/Home' element={<Home />} />
        <Route path='/create' element={<Create />} />
        <Route path='/edit/:id' element={<Edit />} />
        <Route path='/delete/:id' element={<Delete />} />
      </Routes>
    </div>
  )
}

export default App
