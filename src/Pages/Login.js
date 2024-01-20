import React, {useEffect, useState} from 'react'
import './login.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AOS from "aos"; // Import AOS library


const BASE_URL = process.env.BASE_URL || "https://stagingbe.novusaurelius.com/";


const Login = () => {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    console.log("🚀 ~ Login ~ token:", token)
    const [formData, setFormData] = useState({
        username: "",
        password: "",
      });

      const [error, setError] = useState('');
      // const [success, setSuccess] = useState('');
      const [successMessage, setSuccessMessage] = useState('');


    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await axios.post(`${BASE_URL}session_handlers/user_login/`, formData,
          {
            headers: {
              Authorization: "x@pcPvmFcaUrMHQKY4@pNYG22rE&vAk&P-YmnjWx-/mGxr2wcqXXVUnW89S?d@6S",
              "Content-Type": "application/json",
            },
          });
          console.log("🚀 ~ handleSubmit ~ response:", response)
          if (response.status === 200) {
            if(response.data.Status===200){
            localStorage.setItem("token", response.data.Payload.access_token);
            setSuccessMessage('Login successful!');
            setTimeout(() => {
              setSuccessMessage('');
              navigate("/blog", { state: { loginSuccess: true } });
            }, 2000);
            // navigate("/blog");
          }else {
            // Handle unsuccessful login (e.g., show an error message)
            console.error("Unsuccessful login:", response.data.Message);
            setError(response.data.Message || 'Unknown error occurred');
            setTimeout(() => {
              setError('');
            }, 2000);

        }
        } else {
          // Handle other status codes
          console.error("Unexpected status code:", response.status);
          setError(`Unexpected status code: ${response.status}`);
          setTimeout(() => {
            setError('');
          }, 2000);

      }}
        catch (error) {
          console.error("Error:", error);
          setError('An unexpected error occurred');
          setTimeout(() => {
            setError('');
          }, 2000);

          
        }
      };
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      };
    
      useEffect(() => {
        if (token) return navigate("/blog");
      }, [token]);
      useEffect(() => {
        AOS.init();
      }, []);

  return (
    <div className='formcontainer'>

    <div className='content'>
    <div className="formwrapper">
        <span className="logo">Welcome</span>
        {error && <div className="error" >{error}</div>}
          {successMessage && <div className="success">{successMessage}</div>}

        
        <form onSubmit={handleSubmit}>
            <label className='title'> Email*</label>
          <input
            type="text"
            placeholder="Enter Email or UserName"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
         <label className='title'> Password*</label>

          <input
            type="passsword"
            placeholder="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          

          <button type="submit" className="btt">
            Log In
          </button>
        </form>
        
      </div>

    </div>
    </div>
  )
}

export default Login