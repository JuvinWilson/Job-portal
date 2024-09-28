import React,{useState,useEffect} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Inputform from '../components/shared/Inputform.js'
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import { hideLoading, showLoading } from '../redux/features/alertSlice.js'
import Spinner from '../components/shared/Spinner.js'
import Header from './Header.js'
// import { toast } from 'react-toastify'

const Register = () => {
  const [name,setName] = useState(" ")
  const [lastname,setLastname] = useState(" ")
  const [email,setEmail] = useState(" ")
  const [location,setLocation] = useState(" ")
  const [password,setPassword] = useState(" ")
  
  // redux state
  const{ loading } = useSelector((state) => state.alerts)
  
  // hooks
  const navigate = useNavigate()
  const dispatch= useDispatch()

  // const [values,setValues] = useState({
  //   name:"",
  //   lastname:"",
  //   email:"",
  //   location:"",
  //   password:"",
  // });

  // // handle input
  // const handleChange =(e) =>{
  //   const value = e.target.value
  //   setValues({
  //     ...values,
  //     [e.target.name]: value,
  //   });
  // }

  // form function
  const handleSubmit = async(e) => {
    e.preventDefault()
    try{

      // console.log({name,lastname,email,location,password})

      // validation
      if(!name||!lastname||!email||!location||!password){
        alert("please provide all fields")
      }
      

      dispatch(showLoading())
      const {data}=await axios.post('/auth/register',{name,lastname,email,location,password})
      dispatch(hideLoading())
      if(data.success){
        alert("Registration Success")
        navigate('/login')
      }  
    }
    catch(err){
      dispatch(hideLoading())
      alert("invalid registration")
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
    { loading ? (<Spinner />) : (
        <div className='form-container '>
        <form className='card p-2' onSubmit={handleSubmit}>
          <img src='/assets/images/logo.jpg' alt='logo' height={150} width={400} />
          <Inputform htmlFor='name' 
          labelText={'User Name'} 
          type={'text'} 
          name='name' 
          value={name} 
          handleChange={(e)=> setName(e.target.value)}/>
  
          <Inputform htmlFor='lastname' 
          labelText={'Last Name'} 
          type={'text'} 
          name='lastname' 
          value={lastname} 
          handleChange={(e)=> setLastname(e.target.value)}/>
  
          <Inputform htmlFor='email' 
          labelText={'Email'}  
          type={'email'} 
          name='email' 
          value={email} 
          handleChange={(e)=> setEmail(e.target.value)}/>
  
          <Inputform htmlFor='location' 
          labelText={'Location'} 
          type={'text'} 
          name='location' 
          value={location} 
          handleChange={(e)=> setLocation(e.target.value)}/>
  
          <Inputform htmlFor='password' 
          labelText={'Password'} 
          type={'password'} 
          name='password' 
          value={password} 
          handleChange={(e)=> setPassword(e.target.value)}/>
          <div className='d-flex justify-content-between p-2'>
          <p>
            Already Registered? <Link to='/login'>Login</Link>
          </p>
          <button type="submit" className="btn btn-primary">Register</button>
        </div>
        </form>
        </div>
    )}

        {/* <div className="mb-1">
          <label htmlFor="lastname" className="form-label">Last Name</label>
          <input type="text" className="form-control" name='lastname' value={values.lastname} onChange={handleChange}/>
        </div>
        <div className="mb-1">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" name='email' value={values.email} onChange={handleChange} />
        </div>
        <div className="mb-1">
          <label htmlFor="location" className="form-label">Location</label>
          <input type="text" className="form-control" name='location' value={values.location} onChange={handleChange}/>
        </div>
        <div className="mb-1">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" name='password'  value={values.password} onChange={handleChange}/>
        </div> */}
    </>
  )
}

export default Register