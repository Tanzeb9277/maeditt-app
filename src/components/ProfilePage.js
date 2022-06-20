import {useParams} from "react-router-dom";
import React, { useEffect, useState } from "react";
import '../App.css'

function ProfilePage(props){
    let { currentUserId } = useParams();
    let { UserId } = useParams();

    const [userInfo, setUserInfo] = useState({})
    const [render, setRender] = useState(0)



    async function getData(url = '') {
        // Default options are marked with *
        const response = await fetch(url, {
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
        });
        return response.json(); // parses JSON response into native JavaScript objects
      }

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



      const getUserData = async (calledFrom = 'function') => {
        await fetch(`https://hidden-depths-13529.herokuapp.com/${UserId}`, {
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
              let newObj = data.user
              console.log(newObj)
    
              getData(`https://hidden-depths-13529.herokuapp.com/${currentUserId}`)
                .then(userData => {
                  let friendArr = userData.user.friends;
                    if(friendArr.includes(newObj._id)){
                      newObj.friendStatus = true;
                    }
                    
                   
                  setUserInfo(newObj)
    
                  
                })
              })
      
           // parses JSON response into native JavaScript objects
          
        }

        useEffect(() => {
            getUserData("useEffect");
          }, [])

      const follow = (e) =>{
        let following = e.target.getAttribute("data-following")
        if(following == "false"){
            postData(`https://hidden-depths-13529.herokuapp.com/${currentUserId}/friend-request/${UserId}`)
            e.target.innerHTML = 'Request Sent'
            getUserData()
        }
        
    }

    const accept = (e) =>{
        let user = e.target.getAttribute("data-user")
            postData(`https://hidden-depths-13529.herokuapp.com/${currentUserId}/accept-request/${user}`)
            getUserData()
    }
    const decline = (e) =>{
        let user = e.target.getAttribute("data-user")
            postData(`https://hidden-depths-13529.herokuapp.com/${currentUserId}/decline-request/${user}`)
            getUserData()
    }




      if(UserId === currentUserId){
        if(!userInfo.friends){
            return(
                <div class="profile-container">
                    <div class="profile-img">
                    <img src="" alt=""/>
                    </div>
                    <h2>{userInfo.username}</h2>
                    <button onClick={getUserData}>Load Friends List</button>
                </div>
    
    
              )
        }
          return(
            <div class="profile-container">
                <div class="profile-img">
                    <img src="" alt=""/>
                </div>
                <h2>{userInfo.username}</h2>
                <div className="friend-requests">
                    <h2>Friend Request</h2>
                {userInfo.friend_requests.map((request) => {
                    return(
                        <div className="request-container">
                          <div className='post-avatar'>
                            <img className='avatar-img' src=''/>
                        </div>
                            <h2>{request.username}</h2>
                            <button onClick={accept} data-user={request._id}>Accept</button>
                            <button onClick={decline} data-user={request._id}>Decline</button>
                        </div>
                    )
                })}
                </div>
                <div className="friends">
                    <h2>Friends</h2>
                {userInfo.friends.map((friend) => {
                    return(
                        <div className="firend-container">
                          <div className='post-avatar'>
                            <img className='avatar-img' src=''/>
                        </div>
                            <h2>{friend.username}</h2>
                        </div>
                    )
                })}
                </div>
            </div>


          )}
      if(userInfo.friendStatus === true){
        return(
            <div class="profile-container">
                <div class="profile-img">
                <img src="" alt=""/>
                </div>
                <h2>{userInfo.username}</h2>
                <button data-following='true' onClick={follow}>UnFriend</button>
            </div>
          )  
      }
      return(
        <div class="profile-container">
            <div class="profile-img">
            <img src="" alt=""/>
            </div>
            <h2>{userInfo.username}</h2>
            <button data-following='false' onClick={follow}>Add Friend</button>
        </div>
      )
}

export default ProfilePage;