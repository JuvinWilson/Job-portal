import React,{useEffect,useState} from 'react'
import '../../../styles/Layout.css'
import { userMenu } from './Menus/Usermenu'
import { Link,useLocation,useNavigate} from 'react-router-dom'

const Layout = ({children}) => {
    const sidebarmenu = userMenu
    const location = useLocation()
    const [loginuser,setLoginuser]=useState('')
    const navigate = useNavigate();

    useEffect(()=>{
    const user=JSON.parse(localStorage.getItem('user'))
    const token = localStorage.getItem('token');
    if(user && token){
      setLoginuser(user)
    }
    else{
        navigate('/login')
    }
    },[navigate])

    // logout
    const handlelogout =()=>{
        localStorage.clear()
        // toast.success('Logged out Sucessfully')
        // navigate('/login')
    }

  return (
    <>
        <div className='row'>
            <div className="col-md-3 sidebar">
                <div className='logo'>
                    <h6>Job portal</h6>
                </div>
                <hr/>
                <p className='text-center text-warning'>Welcome:{loginuser && loginuser.name +" "+ loginuser.lastname}</p>
                <hr/>
                <div className='Menu'>
                    {sidebarmenu.map(menu =>{
                        const isActive = location.pathname === menu.path
                        return(
                            <div className={`menu-item ${isActive && "active"}`}>
                                <i className={menu.icon}></i>
                                <Link to={menu.path}>{menu.name}</Link>
                            </div>
                        )
                    })}
                    <div className={`menu-item`}>
                        <i class="fa-solid fa-right-from-bracket"></i>
                        <Link to='/login' onClick={handlelogout}>Logout</Link>
                    </div>
                </div>
            </div>
            <div className='col-md-9'>{children}</div>
        </div>
    </>
  )
}

export default Layout