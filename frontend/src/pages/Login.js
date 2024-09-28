import React,{useState, useEffect} from 'react';
import Inputform from '../components/shared/Inputform.js';
import { Link,useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useDispatch,useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../redux/features/alertSlice.js';
import Spinner from '../components/shared/Spinner.js';
import Header from './Header.js';


const Login = () => {
  const [email,setEmail] = useState(" ")
  const [password,setPassword] = useState(" ")

  // redux state
  const{ loading } = useSelector((state) => state.alerts)

  // hooks
  const navigate=useNavigate()
  const dispatch = useDispatch()

   // form function
   const handleSubmit = async(e) => {
    e.preventDefault()
    try{
        // console.log({email,password})
        if(!email||!password){
          alert("please provide all fields")
        }
        dispatch( showLoading() )
        const {data} = await axios.post('/auth/login',{email,password})
        dispatch( hideLoading() )
        if(data.success){
          dispatch( hideLoading())
          localStorage.setItem('user', JSON.stringify({...data.user,password:' '}))
          // console.log(data.token)
          localStorage.setItem('token', data.token)
          alert("User login successfully")
          navigate('/dashboard')
        }
    }
    catch(err){
      dispatch( hideLoading())
      alert("Invalid login credentials")
      console.log(err)
    }
  }
  useEffect(()=>{
    if(localStorage.getItem('user') && localStorage.getItem('token')){
      navigate('/dashboard')
    }
  },[navigate]);


  return (
    <>
      <Header/>
      { loading ? (<Spinner/>):(
        <div className='form-container '>
        <form className='card p-2' onSubmit={handleSubmit}>
          <img src='/assets/images/logo.jpg' alt='logo' height={150} width={400} />

          <Inputform htmlFor='email' 
          labelText={'Email'}  
          type={'email'} 
          name='name' 
          value={email} 
          handleChange={(e)=> setEmail(e.target.value)}/>

          <Inputform htmlFor='password' 
          labelText={'Password'} 
          type={'password'} 
          name='password' 
          value={password} 
          handleChange={(e)=> setPassword(e.target.value)}/>

          <div className='d-flex justify-content-between p-2'>
            <p>
             New User? <Link to='/register'>Register here</Link>
            </p>
            <button type="submit" className="btn btn-primary">Login</button>
          </div>

        </form>
        </div>
      )}
    </>
  )
}

export default Login