// container to gather movie logic
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import CommentableForm from '../Comment/CommentableForm';
import CommentableContainer from '../Comment/CommentableContainer';
import MovieDisplay from './MovieDisplay';
import MovieSearchBar from './MovieSearchBar';

const propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired, // material UI
  curr_movie: PropTypes.instanceOf(Object).isRequired, // OMBD api object
  curr_user: PropTypes.instanceOf(Object).isRequired, // mocked
  displayingAddCommentForm: PropTypes.bool.isRequired, 
  // ===> functions
  addComment: PropTypes.func.isRequired, // adds a new review instance to api
  getMovieData: PropTypes.func.isRequired, // search for curr_movie
}

class MoviePage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      displayingAddCommentForm: false
    }

    this.toggleCommentableForm = this.toggleCommentableForm.bind(this);
  }

// allows the addComment form to toggle on and off
toggleCommentableForm() {
  this.setState({ displayingAddCommentForm: !this.state.displayingAddCommentForm });
}

  render() {  

    // deconstruct prop objects
    const { classes, curr_movie, curr_user } = this.props 
    // deconstruct prop functions
    const { addComment, getMovieData, } = this.props 
    const { displayingAddCommentForm } = this.state;
    
    const MovieCommentForm =(
      <CommentableForm 
        addCommentable={addComment} 
        curr_user={curr_user}
      /> 
    )

    return (
      <div className={classes.grid}>

        <h1 style={{ background: 'aliceblue', gridArea: 'title'}} > 
          Movie Blog! 
        </h1>
      
        <div className={classes.actions} style={{ gridArea: 'addComment' }}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={this.toggleCommentableForm}
          >
            Add Review
          </Button>
        </div>

        <div style={{ gridArea: 'search' }}>
          <MovieSearchBar getMovieData={getMovieData} /> 
        </div>

        <div style={{ gridArea: 'form' }}>
          { displayingAddCommentForm &&  MovieCommentForm } 
        </div>
        
        <div style={{ gridArea: 'movies' }} >
          <MovieDisplay curr_movie={curr_movie} posterUrl={curr_movie.Poster}/>
        </div>
        
        <div style={{ gridArea: 'comments' }} >
          <CommentableContainer 
            commentableID={curr_movie.imdbID}
            commentableType={"Movie"}
            curr_user={curr_user}
          />
        </div>
      </div>
    )
  }
}

const styles = theme => ({
  grid: {
    display: 'inline-grid',
    gridTemplateAreas: `
      "title title "
      "form form"
      "search addComment"
      "comments comments"
      "movies movies"
    `,
    gridTemplateColumns: '1fr 1fr',
    padding: theme.spacing.unit,
  },

  actions: {
    display: 'grid',
    padding: theme.spacing.unit,
  }
})

MoviePage.propTypes = propTypes;

export default withStyles(styles)(MoviePage)
