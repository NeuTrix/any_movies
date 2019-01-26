import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CommentableContainer from './CommentableContainer';
import MovieContainer from './MovieContainer';
import axios from 'axios';

// include props declartaions (classes)

const propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  // acquire through movie Api and pass down
  movie: PropTypes.instanceOf(Object).isRequired,
}

class MovieReviewPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // imdbId: '',
      // movieId: movie.id,
      // inDatabase: false,
    }
    this.searchMovie = this.searchMovie.bind(this)
  }

  // check to see if a movie is in our database
  isMovieSaved(id) {
    // axios.get(`/api/movies/${id}`)
    this.setState({ inDatabase: true });
  }

  // find a movie to review
  searchMovie() {
    //  search the api
    // set the imdb id for state from the search item
    this.setState({imdbId: 'tt0078748'})
    // this.setState({movieId: 'tt0078748'})
  }

  render() {
    const { classes, movie } = this.props
    return (
      <div className={classes.grid}>
        <h1 className={classes.title}>
         Movie Review Page
        </h1>
        <div className={classes.search} >
          <button onClick={this.searchMovie}>
            Search
          </button>
        </div>
        <div className={classes.comments}>
          <CommentableContainer 
            commentableId={movie.id}
            commentableType='Movie'
          />
        </div>
        <div className={classes.movies}>
          <MovieContainer/>
        </div>
      </div>
    )
  }
}

const styles = {
  grid: {
    display: 'inline-grid',
    gridTemplateAreas: `
      "title title"
      "search comments"
      "movies comments "
    `,
    gridTemplateColumns: '5fr 5fr',
    gridTemplateRows: '2fr 1fr 7fr',
    padding: 5,
    margin: 10,
  },

  comments: {
    background: 'orangered',
    gridArea: 'comments',
  },

  movies: {
    display: 'grid',
    background: 'lime',
    gridArea: 'movies',
  },

  search:{
    background: 'violet',
    gridArea: 'search',
    // minHeight: 50,
  }
}

const mapStateToProps = (state) => ({
  movie: state.movie,
})

export default connect(mapStateToProps)(withStyles(styles)(MovieReviewPage))