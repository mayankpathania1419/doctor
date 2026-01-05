import { Outlet, Link } from 'react-router-dom'
import { MdContacts } from 'react-icons/md'
import { FaUserAlt } from 'react-icons/fa'
import { FaInfoCircle } from 'react-icons/fa'
import { MdAnalytics } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'


const SidebarLayout = () => {

    const navigate = useNavigate()


    useEffect(() => {
        const token = localStorage.getItem('usertoken')

        if (!token) {
            navigate('/', { replace: true })
        }
    }, [navigate])



    const logout = () => {
        localStorage.removeItem('usertoken')
        navigate('/')
    }
    return (
        <div className='main-content'>
            <aside>
                <div className='md-6'>
                    <h2 className='headline'>Navigation</h2>
                    
                        <br></br>
                        <Link className='md-2' to='User'>< FaUserAlt></FaUserAlt> User</Link>
                        <br></br>
                        <br></br>
                        <Link className='md-1' to='Profile'> <FaInfoCircle></FaInfoCircle>Profile</Link>
                        <br></br>
                        <br></br>
                        <Link className='md-3' to='Contact'> <MdContacts></MdContacts>Contact</Link>
                        <br></br>
                        <br></br>
                        <Link className='md-4' to='Analytics'><MdAnalytics></MdAnalytics>Analytics</Link>
                        <br></br>
                     
               </div>
            </aside>
          
                <header className="header">
                      <h2 className='h-2'>Dashboard</h2>
                    <Link className='LINK-1' to='Blog'>Blog</Link>
                    <Link className='LINK2' to="Resource">Resource</Link>
                    <button className="logout-button" onClick={logout}>Logout</button>
                
                </header>
            
            <main>
                <Outlet />
            </main>
            </div>
        
    )
}
export default SidebarLayout;