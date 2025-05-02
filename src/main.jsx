import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'


import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import { BrowserRouter, NavLink, Route,  Router,  Routes } from 'react-router-dom'
import NoFeed from './pages/NoFeed.jsx'
import SearchResult from './pages/searchResult.jsx'
import { SearchProvider } from './components/SearchCreateContext.jsx'
import AdminPage from './pages/AdminPage.jsx'
import ToastedMessage from './components/ToastedMessage.jsx'
import AdminSideMenu from './components/AdminSideMenu.jsx'
import UserRegister from './pages/UserRegister.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
// import FileUpload from './components/FileUpload.jsx'
// import Modals from './components/Modals.jsx'

createRoot(document.getElementById('root')).render(
  <>
  <SearchProvider>
    <BrowserRouter>
    
       
   

      

    <Routes>
   
   <Route path="/" element={<Login/>} ></Route>
   <Route index element={<Login/>}></Route>
   <Route path="home" element={<App/>}></Route>
   <Route path="register" element={<Register/>}></Route> 
   <Route path="result" element={<SearchResult/>}></Route>
   <Route path='adminPage' element = {<AdminPage/>}></Route>
    <Route  path='normal-user' element={<UserRegister/>} />
    <Route path='forgot-user' element={<ForgotPassword/>} />
   
  </Routes> 
   
     
    
    </BrowserRouter>
    </SearchProvider>

    {/* <Modals /> */}
{/* <Login></Login> */}
    {/* <Register /> */}

    {/* <FileUpload /> */}

    {/* <NoFeed></NoFeed> */}

    {/* <AdminPage/> */}
  </>,
)
