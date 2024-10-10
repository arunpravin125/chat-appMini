import {BrowserRouter,Navigate,Route,Routes} from "react-router-dom"
import './App.css'
import Signup from './pages/Signup'
import Login from './pages/Login'
import HomePage from './pages/HomePage'
import { useAuthContext } from "./context/AuthContext"

function App() {
  const {authUser}=useAuthContext()
  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={authUser?<HomePage/>:<Navigate to="/login" />} ></Route>
       <Route path="/sign" element={authUser? <Navigate to="/" /> :<Signup/>} ></Route>
       <Route path="/login" element={authUser?<Navigate to="/" />:<Login/>} ></Route>
     
    </Routes>
    
    </BrowserRouter>
     
    </>
  )
}

export default App

// <Route path="/" element={authUser?<HomePage/>:<Navigate to="/login" />} ></Route>
//       <Route path="/sign" element={authUser? <Navigate to="/" /> :<Signup/>} ></Route>
//       <Route path="/login" element={authUser?<Navigate to="/" />:<Login/>} ></Route>


{/* <Route path="/" element={<HomePage/>} ></Route>
      <Route path="/sign" element={<Signup/>} ></Route>
      <Route path="/login" element={<Login/>} ></Route> */}