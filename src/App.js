import './App.css'
import { BrowserRouter,Routes,Route} from 'react-router-dom'

import Login from './Login'
import Attend from './Attend'
import {ToastContainer} from 'react-toastify'
import ProtectedRoute from './ProtectedRoute'
import About from './About'
import Profile from './Profile'
import Contact from './Contact'
import Analytics from './Analytics'
import User from './User'
import Resource from './Resource'
import Blog from './Blog'

import './User.css'
import './login.css'

import SidebarLayout from './SidebarLayout'
import './SidebarLayout.css'

function App(){
   return(
   <BrowserRouter>
   <ToastContainer/>
     
     <Routes>
       
       <Route path='/' element={<Login/>}/>

       <Route path='/signup'  element={<Attend/>}/>

       <Route element={<ProtectedRoute/>}>
       <Route path="/layout"  element={<SidebarLayout/>}>
       <Route index element={<User/>}/>

       <Route path='user' element={<User/>}></Route>
       <Route path="Profile" element={<Profile/>}></Route>
         <Route path='contact' element={<Contact/>}></Route>
         <Route path='analytics' element={<Analytics/>}></Route>    
         <Route path='resource' element={<Resource/>}></Route>  
         <Route path='blog'     element={<Blog/>}></Route>
       </Route>
       
       </Route>

     </Routes>
   </BrowserRouter>
   )
}
export default App;