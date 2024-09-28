import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {Modal,Form,Input, message} from 'antd'
import Layout from '../components/shared/Layout/Layout.js'
import '../styles/Dashboard.css'


const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [workLocation, setworkLocation] = useState('');
  const [workType, setworkType] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const[isModal,setModal]=useState('')

  const showModal = ()=>{
    setModal(true)
  }
  const modalCancel = ()=>{
    setModal(false)
  }


  // submitting applications of jobs

  const Submithandler=()=>{
    // const formData = new FormData();
    
    // // Append form values to FormData
    // formData.append('firstname', values.firstname);
    // formData.append('lastname', values.lastname);
    // formData.append('email', values.email);
    // formData.append('phoneno', values.phoneno);
    // formData.append('currentctc', values.currentctc);
    // formData.append('expected', values.expected);

    // // Handle the file (resume)
    // if (values.resume && values.resume.file) {
    //   formData.append('resume', values.resume.file.originFileObj);
    // }

    // try {
    //   const token = localStorage.getItem('token');
    //   const config = {
    //     headers: {
    //       'Content-Type': 'multipart/form-data', // Important for file uploads
    //       Authorization: `Bearer ${token}`
    //     }
    //   };
    //   const response = await axios.post('/job/appliedjobs',config);
    //   if (response.data.success) {
    //     alert('Application submitted successfully!');
    //   } else {
    //     alert('Failed to submit application.');
    //   }
    // } catch (error) {
    //   console.error('Error submitting application:', error);
    //   alert('Error occurred while submitting the application.');
    // }
    try{
      message.success("Application submitted successful")
    }
    catch(err){
      message.error("Application failed")
    }
  };

  
  // Function to fetch all jobs
  const fetchJobs = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No token found, please log in.');
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        search, // Send search term as query parameter
        workLocation, // Send location filter as query parameter
        workType, // Send work type filter as query parameter
      }
    };

    try {
      const response = await axios.get('/job/getjobs', config); //// Pass query parameters
      setJobs(response.data.jobs);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching jobs', error);
      setError('Failed to fetch jobs.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs(); // Fetch jobs when component mounts or search/filter criteria change
  }, []);
  

  return (
    <Layout>
      <div className="dashboard-container">
        <h1 className="dashboard-title">Dashboard Page</h1>
        <div className="filter-container">
        <input
          className="input-field"
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          className="input-field"
          type="text"
          placeholder="Filter by location"
          value={workLocation}
          onChange={(e) => setworkLocation(e.target.value)}
        />
        <input
          className="input-field"
          type="text"
          placeholder="Filter By WorkType"
          value={workType}
          onChange={(e) => setworkType(e.target.value)}
        />
        <button className="search-button" onClick={fetchJobs}>Search</button>
        </div>

        {loading ? (
          <p className="loading-text">Loading...</p>
        ) : error ? (
          <p className="error-text">{error}</p>
        ) : (
          <ul className="job-list">
            {jobs.length > 0 ? (
              jobs.map(job => (
                <li key={job._id} className="job-item">
                  <h3 className="job-title">{job.position}</h3>
                  <p className="job-company">company name:{job.company}</p>
                  <p className="job-location">Location:{job.workLocation}</p>
                  <p className="job-type">WorkType:{job.workType}</p>
                  <button className="btn btn-primary" style={{marginTop:"10px"}} onClick={showModal} > Apply Here </button>
                </li>
              ))
            ) : (
              <p className="no-jobs-text">No jobs found.</p>
            )}
          </ul>
        )}
          <Modal title="SUBMIT APPLICATION" open={isModal} onCancel={modalCancel} footer={false}>
            <div className='d-flex justify-space-between p-4'>
              <Form layout='horizontal' onFinish={Submithandler} encType="multipart/form-data">
                <Form.Item label="First Name" name="firstname" rules={[{ required: true, message: 'Please input your first name!' }]}>
                  <Input type="text"  style={{marginLeft:'30px'}}/>
                </Form.Item>
                <Form.Item label="Last Name" name="lastname" rules={[{ required: true, message: 'Please input your last name!' }]}>
                  <Input type="text"  style={{marginLeft:'30px'}}/>
                </Form.Item>
                <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}>
                  <Input type="email" style={{marginLeft:'60px'}}/>
                </Form.Item>
                <Form.Item label="Phone No" name="phoneno" rules={[{ required: true, message: 'Please input your phone number!' }]}>
                  <Input type="number"  style={{marginLeft:'30px'}}/>
                </Form.Item>
                <Form.Item label="Current Ctc" name="currentctc" rules={[{ required: true, message: 'Please input your current ctc!' }]} >
                  <Input type="text" style={{marginLeft:'20px'}}/>
                </Form.Item>
                <Form.Item label="Expected Ctc" name="expected" rules={[{ required: true, message: 'Please input your expected CTC!' }]}>
                  <Input type="text"style={{marginLeft:'15px'}}/>
                </Form.Item>
                <Form.Item label="Upload Resume" name="resume" valuePropName="file" getValueFromEvent={(e) => (e && e.file ? e.file : e)}>
                  <Input type="file" accept=".pdf,.doc,.docx"/><p>min 10mb size</p>
                </Form.Item>
                <div className='d-flex justify-content-center'>
                  <button className='btn btn-primary'>SUBMIT</button> 
                </div>
              </Form>
            </div>
          </Modal>
      </div>
    </Layout>
  )
}

export default Dashboard
