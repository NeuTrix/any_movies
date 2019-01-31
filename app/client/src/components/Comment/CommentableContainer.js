// container to gather movie logic
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import CommentsPage from './CommentsPage';
import CommentCard from './CommentCard';

const propTypes = {
	commentable: PropTypes.instanceOf(Object).isRequired, // movie or comment obj
  commentable_id: PropTypes.string.isRequired,
  commentable_type: PropTypes.string.isRequired,
  curr_user: PropTypes.instanceOf(Object).isRequired,
}

class CommentableContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comments: [], // generated comments for this instance
    }

    this.addComment = this.addComment.bind(this);
    this.getComments = this.getComments.bind(this)
    // this.editComment = this.editComment.bind(this)
    // this.deleteComment = this.deleteComment.bind(this)
  }
  
  // immutably set state for comments
  componentDidMount() {
    this.setState((state, props) => {
      this.getComments();
    })
  }

  // update the component if new props recieved
  componentDidUpdate(prevProps) {
    const { commentable_id } = this.props;
    
    if ( prevProps.commentable_id !== commentable_id) {
      this.getComments();
    }
  }

  addComment(data) {
    const { commentable_id, commentable_type , curr_user} = this.props;
    
    // update the data object with required fields
    data.commentable_id = commentable_id;
    data.commentable_type = commentable_type;
    data.user_id = curr_user.id;

    //   // determine rails path for commentable
    let path = commentable_type === 'Movie' ? 'movies' : 'comments'

    return axios.post(`/api/${path}/${commentable_id}/comments`, data)
      .then(resp => {
        alert(`Your comment was added! \n commentable_id: ${resp.data.id}`)
        this.setState({ displayingCommentForm: false });
        return resp.data
      })
      .catch(err => { 
        alert (
          `There was a problem adding your comment. 
          \n "CommentableContainer"
          \n ${err}`
        )
        console.log('ERROR=>',err); 
      })
  }

  // used to populate the comments state object
  getComments() {
    const { commentable_id, commentable_type } = this.props;

    // determine correct path for commentable
    // not DRY duplicated in other functions
    let path = commentable_type === 'Movie' ? 'movies' : 'comments'

    return axios.get(`/api/${path}/${commentable_id}/comments`)
      .then(resp => {
        let comments = resp.data;
        this.setState((state) => {
          return {...state, comments}
        });
        
        return comments
      })
      .catch(err => {
        alert(`Err...This Movie may not be registered \n ${err}`)
        console.log('ERROR=>', err);

        this.setState((state) => {
          let comments = [];
          return { ...state, comments }
        });
      })
  }

   render() {
    //  dconstruct props
    const { 
      commentable, 
      commentable_id, 
      commentable_type,  
      curr_user 
    } = this.props;
 
    // build comment cards
    const commentsList = this.state.comments.map(comment => {
      // should consider spreading props from the parent instead
      return ( 
        <div key={comment.id}> 
          <CommentCard 
            commentable={comment} 
            commentable_id={commentable_id}
            commentable_type={commentable_type}
            curr_user={curr_user}
            /> 
        </div>
      ) 
    })
    
    return (
      <CommentsPage 
        commentable={commentable} 
        commentsList={commentsList} 
        curr_user={curr_user} 
        addComment={this.addComment} // for form execution
      />
    )
  }
}

CommentableContainer.propTypes = propTypes;

export default CommentableContainer