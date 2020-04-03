import React,{ useState} from "react";
import {Redirect} from 'react-router-dom';
import axiosWithAuth from './Auth';
import axios from 'axios'


const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [login, setLogin] = useState({
    username: '',
    password: ''
  });

  const handleChange = e => {
    setLogin({
        ...login,
        [e.target.name]: e.target.value
    });
  };

  const userLogin = (e) => {
    e.preventDefault()
    axios
      .post("http://localhost:5000/api/login", login)
      .then(res => {
        console.log("response", res.data);
        const { data } = res;

        localStorage.setItem("token", data.payload);
        props.history.push('/bubbles');
        // if (localStorage.getItem('token')){
        //   return <Redirect to='/bubbles' />;
        // }
      });
      
  };


  
  return (
    <div style={{margin: '0 auto'}}>
      <h1>Welcome to the Bubble App!</h1>
      <div >
        <h2 style={{margin: '0 auto',marginTop:'2rem'}}>Please Login!</h2>
        <form style={{padding:'0.5rem'}} onSubmit={userLogin}>
          <input 
            type='text'
            name='username'
            value={login.username}
            onChange={handleChange}
            placeholder='Username'
            style={{ margin: '0 auto', fontSize:'1.4rem', width: '50%',marginBottom: '1rem'}}/>
          <input 
            type='password'
            name='password'
            value={login.password}
            onChange={handleChange}
            placeholder='Password'
            style={{ margin: '0 auto', fontSize:'1.4rem', width: '50%',marginBottom: '1rem'}}/>
          <button 
            style={{width: '50%', margin: '0 auto',fontSize:'1.4rem'}}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
