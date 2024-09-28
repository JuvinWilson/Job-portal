import React, { useState } from 'react'
import Layout from '../components/shared/Layout/Layout'
import Inputform from '../components/shared/Inputform.js'
import axios from 'axios'


const Updateprofile = () => {
    const[name,setName]=useState()
    const[lastname,setLastName]=useState()
    const [email,setEmail] = useState()
    const [location,setLocation] = useState()

    // form function
    const handlesubmit= async(e) => {
        e.preventDefault()
        try{
            // validate
            if(!name || !email || !lastname || !location){
                alert('please provide all fields');
            }
            await axios.put('/user/update-users',{name,lastname,email,location})
            alert("user updated successfully")
        }
        catch(err){
            alert("error updating")
        }
    }

  return (
    <Layout>
        <div>
            <div className='form-container'>
                <form className='card p-2' onSubmit={handlesubmit}>
                <h1 className='text-center' style={{color:'red'}}>Update Profile</h1>
                    <div className='mt-2'>
                    <Inputform htmlfor='name'
                    labelText={'Name'}
                    name='name'
                    type={'text'}
                    value={name}
                    handleChange={(e)=> setName(e.target.value)}
                    />

                    <Inputform htmlfor='lastname'
                    labelText={'LastName'}
                    name='lastname'
                    type={'text'}
                    value={lastname}
                    handleChange={(e)=> setLastName(e.target.value)}
                    />

                    <Inputform htmlfor='email'
                    labelText={'Email'}
                    name='email'
                    type={'email'}
                    value={email}
                    handleChange={(e)=> setEmail(e.target.value)}
                    />

                    <Inputform htmlfor='location'
                    labelText={'Location'}
                    name='location'
                    type={'text'}
                    value={location}
                    handleChange={(e)=> setLocation(e.target.value)}
                    />
                    </div>

                    <div className='d-flex justify-content-center'>
                        <button type='submit' className='btn btn-primary'>Update</button>
                    </div>

                </form>
            </div>
        </div>
    </Layout>
  )
}

export default Updateprofile