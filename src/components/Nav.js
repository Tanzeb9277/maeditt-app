import React, { useEffect, useState } from "react";
import '../App.css'
import { Link } from 'react-router-dom';
import {useParams} from "react-router-dom";


  function Nav(props)  {
    let { currentUserId } = useParams();
    const [user, setUser] = useState({});

    const getUser = async (calledFrom = 'function') => {
        await fetch(`https://hidden-depths-13529.herokuapp.com/${currentUserId}`, {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        }).then(response => response.json())
            .then(data => {
                let newObj = data.user;
                setUser(newObj)
    
              
              })
      
           // parses JSON response into native JavaScript objects
          
        }


    useEffect(() => {
        getUser("useEffect");
      }, [])
        

        return(
            <nav>
                <Link to={`/${currentUserId}/feed`} className='logo'>
                    <h2>maeditt</h2>
                </Link>
                <div className='search'>
                    <input type="text" placeholder='Search' id='search-bar'/>
                </div>
                <div className='account' onClick={props.onClick}>
                    <div className='avatar'>
                        <img className='avatar-img' src=''/>
                    </div>
                    <Link to={`/${currentUserId}/user/${currentUserId}`} id='user-profile-link'>
                    <h2 className='username' id='nav-username' data-login='false'>{user.username}</h2>
                    </Link>
                </div>
            </nav>
        )
    }
  
  export default Nav;