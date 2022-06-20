import React, { Component } from 'react';



class Comment extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className='comment-container'>
                <h3>{this.props.user}</h3>
                <h3 className='comment-date'>{this.props.date}</h3>
                <p>{this.props.text}</p>
                <hr/>
            </div>
        )
    }
}

export default Comment;