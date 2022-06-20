import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import '../App.css'


const LandingPage = (props) => {



    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    async function postData(url = '', data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(data) // body data type must match "Content-Type" header
        })
        
        return response.json(); // parses JSON response into native JavaScript objects
      }


    const register = (e) => {
        e.preventDefault();
        postData('https://hidden-depths-13529.herokuapp.com/sign-up', {
            username: username,
            email: email,
            password: password,
            confirm_password: confirmPassword
        })
        .then(data=>{
            console.log(data)
            if(!data.username){
                alert(data.errors)
            }else{
                document.getElementById("signup-form").style.display = 'none';
                document.getElementById("login-form").style = 'display: block;';
            }
        })
    };


    const signIn = (e) =>{
        e.preventDefault();
        postData('https://hidden-depths-13529.herokuapp.com/log-in', {
            username: username,
            password: password
        })
    .then(data => {
      console.log(data)
      if(!data.user){
          alert(data.message)
      }else{
      console.log(data.user[0].username)
      navigate(`/${data.user[0].id}/feed`, {replace: true})
      }

    });
        
      }
      const GuestSignIn = (e) =>{
        e.preventDefault();
        postData('https://hidden-depths-13529.herokuapp.com/log-in', {
            username: 'Guest User',
            password: 'test123'
        })
    .then(data => {
      console.log(data)
      if(!data.user){
          alert(data.message)
      }else{
      console.log(data.user[0].username)
      navigate(`/${data.user[0].id}/feed`, {replace: true})
      }

    });
        
      }

    const changeForm =(e)=> {
        let to = e.target.getAttribute('data-tochange');
        let from = e.target.getAttribute('data-changefrom');
        document.getElementById(from).style.display = 'none';
        document.getElementById(to).style = 'display: block;';
  }


    return (
        <div className='login' id='login'>
        <div className='screen' onClick={props.onClick}>

        </div>
        <div className='login-card'>
            <div className='header-img'>
            </div>
            <div className='login-form' id="login-form">
                <form>
                    <h1>Log In</h1>
                    <input 
                        type="text" 
                        placeholder='Username'
                        name='username' 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <input 
                        type="password" 
                        placeholder='Password'
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={signIn}>Log In</button>
                </form>
                <p>Don't have an Account? <span onClick={changeForm} data-tochange='signup-form' data-changefrom='login-form'>Sign Up</span></p>
                <p>Sign in as a  <span onClick={GuestSignIn} >Guest User</span></p>
            </div>
            <div className='signup-form' id="signup-form">
                <form>
                    <h1>Sign Up</h1>
                    <input 
                        type="text" 
                        placeholder='Username' 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input 
                        type="text" 
                        placeholder='Email' 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input 
                        type="password" 
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input 
                        type="password" 
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button onClick={register}>Sign Up</button>

                    
                </form>
                <p>Already have an Account? <span onClick={changeForm} data-tochange='login-form' data-changefrom='signup-form'>Login</span></p>
            </div>
        </div>
    </div>
    );
  };
  
  export default LandingPage;