import '../App.css'
import LineIcon from "react-lineicons";
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import {useParams} from "react-router-dom";
import Comment from './comment';


function Post(props){
    let { currentUserId } = useParams();
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("")


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


      const getComments = (e) =>{
          let postid = e.target.getAttribute('data-postid');
          getData(`https://hidden-depths-13529.herokuapp.com/${postid}/comments`)
            .then(data =>{
              console.log(data)
              setComments(data.comments)
            })
      }

      const postComment = (e) => {
          e.preventDefault();
          let postUrl = e.target.getAttribute("data-postUrl")
          postData(postUrl,{text: newComment}).then(data =>{
            
          })
          setNewComment('')
          getComments(e)
          
      }

      



    const liked = (e) =>{
        let like = e.target.getAttribute("data-liked")
        if(like == "false"){
            let postid = e.target.getAttribute("data-postid")
            postData(`https://hidden-depths-13529.herokuapp.com/${currentUserId}/like-post/${postid}`)
            e.target.setAttribute("class", "lni lni-lni lni-heart-filled size-md ")
            e.target.setAttribute("data-liked", "true")
            e.target.style.color = '#ec5451'
        }else{
            let postid = e.target.getAttribute("data-postid")
            postData(`https://hidden-depths-13529.herokuapp.com/${currentUserId}/unlike-post/${postid}`)
            e.target.setAttribute("class", "lni lni-lni lni-heart size-md" )
            e.target.setAttribute("data-liked", "false")
            e.target.style.color = 'black'
        }
        
    }


   




    

    if(comments.length === 0){
        return(
            <div className="post">
                <div className='sidebar'>
                    <div className='like'>
                        <LineIcon name="lni lni-heart" style={props.color} className={props.icon} onClick={liked} data-liked={props.liked} data-postid={props.postid}/>
                    </div>
                    <div className='share'>
                        <LineIcon name="lni lni-share-alt-1" />
                    </div>
                </div>
                <div className='main'>
                    <div className='user'>
                        <div className='post-avatar'>
                            <img className='avatar-img' src=''/>
                        </div>
                        <Link to={props.profileLink}>
                            <h2 className='username'>{props.user}</h2>
                        </Link>
                    </div>
                    <div className='title'>
                        {props.title}
                    </div>
                    <div className='post-text'>
                        <h3>{props.text}</h3>
                    </div>
                    <div className='post-img'>
                        <img src={props.path}/>
                    </div>
                    <div className='new-comment'>
                        <form className='comment-form' method='post'>
                        <input className='new-comment' type='text' name='text' placeholder='Write a comment...' value={newComment} onChange={(e) => setNewComment(e.target.value)}></input>
                        <button className='comment-button' data-postUrl={props.postUrl} data-postid={props.postid} onClick={postComment} >Comment</button>
                        </form>
                    </div>
                    <button className='load-comments' onClick={getComments} data-postid={props.postid}>Load Comments</button>
                </div>
            </div>
        )
    }  return(
            <div className="post">
                <div className='sidebar'>
                    <div className='like'>
                        <LineIcon name="lni lni-heart" style={props.color} className={props.icon} onClick={liked} data-liked={props.liked} data-postid={props.postid}/>
                    </div>
                    <div className='share'>
                        <LineIcon name="lni lni-share-alt-1" />
                    </div>
                </div>
                <div className='main'>
                    <div className='user'>
                        <div className='post-avatar'>
                            <img className='avatar-img' src=''/>
                        </div>
                        <a href={props.profileLink}>
                            <h2 className='username'>{props.user}</h2>
                        </a>
                    </div>
                    <div className='title'>
                        {props.title}
                    </div>
                    <div className='post-text'>
                        <h3>{props.text}</h3>
                    </div>
                    <div className='post-img'>
                        <img src={props.path}/>
                    </div>
                    <div className='new-comment'>
                    <form className='comment-form' method='post'>
                        <input className='new-comment' type='text' name='text' placeholder='Write a comment...' value={newComment} onChange={(e) => setNewComment(e.target.value)}></input>
                        <button className='comment-button' data-postUrl={props.postUrl} data-postid={props.postid} onClick={postComment} >Comment</button>
                        </form>
                    </div>
                    
                    {comments.map((comment) => {
                        if(comments == []){
                            return <button onClick={getComments} data-postid={props.postid}>Load Comments</button>
                        }
                        return <Comment
                        user={comment.user.username}
                        date={comment.date_formatted}
                        text={comment.text}
                />;
                
              })}
                </div>
            </div>
        )
    }


export default Post