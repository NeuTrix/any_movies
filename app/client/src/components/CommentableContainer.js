// Stateful. takes commmentable props & ret. any array of comments for display
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';

import CommentsList from './CommentsList';

const propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired, // for MUI styling
  // comments: PropTypes.instanceOf(Array).isRequired, // comments for related item
  commentableID: PropTypes.string.isRequired,
  commentableType: PropTypes.string.isRequired,
}

class CommentableContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comments: [],
    }
    // this.getComments = this.getComments.bind(this);
  }
  // call this the first time the component mounts to set state
  componentDidMount() {
    const { commentableID, commentableType } = this.props
    this.getComments(commentableID, commentableType)
  }

  componentDidUpdate(prevProps) {
    const { commentableID, commentableType } = this.props
    
    console.log(prevProps.commentableID, this.props.commentableID)
    if (prevProps.commentableID !== this.props.commentableID ) {
      // alert(prevProps.commentableID)
        // alert(this.props.commentableID)
        // alert('something changed')

    this.getComments(commentableID, commentableType)
        
    }
  }
    

  //  set a controller in API to find the id for this movie
  // search by imdbID
  getComments(id, type) {

    
    let pathType = type === 'Movie' ? 'movies' : 'comments'
    // Look for corresponding comments for this object 
    axios.get(`/api/${pathType}/${id}/comments`)
      .then(resp => {
        const data = resp.data;
        console.log('==> COMMENTS data: ', data);
        // verify 
        this.setState({ comments: data }); 
        // if (data && data.length > 1) {
        // if (resp.status === 200 && data.length > 1) {
          // return data
        // } 
      })
      // catch error from the OMDB api
      .catch(err => {
        console.log('ERROR=>',err);
      })
  }

  render() {
    const { classes, commentableID, commentableType } = this.props
    const { comments } = this.state

    // let display
    // if (comments && comments.length > 0) {
    //   display =  <CommentsList comments={comments}/>
    // } 
    
    return (
      <div className={classes.main}>
       
        THE LENGTH IS: {comments.length}
        {/* <div>{comments[0]}</div> */}
        {/* <div>{comments[1]}</div> */}

      </div>
    )
  }
}

const styles = {
  main: {
    padding: 5,
    outline: '3px solid purple',
  }
}

CommentableContainer.propTypes = propTypes;

export default withStyles(styles)(CommentableContainer)