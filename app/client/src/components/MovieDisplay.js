import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'

const propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  movie: PropTypes.instanceOf(Object).isRequired,
}

function MovieDisplay(props) {

  const { classes, movie } = props
  
  // generate list of movie ratings
  const ratings = movie.Ratings && movie.Ratings.map((rating, index) => {
    return ( 
      <div key={index} className={classes.ratingUnit}> 
        <div style={{gridArea: 'critic'}} > {rating.Source}: </div>
        <div style={{gridArea: 'grade', textAlign: 'right'}} > {rating.Value} </div>
      </div> 
    )
  })

  // if actors listed, make a list
  const actors = movie.Actors && movie.Actors.split(',').map((actor, index) => {
    return ( <div key={index}> - {actor} </div> )
  })

  return (
    <div className={classes.main} >

      <div className={classes.title}>
        <Typography variant="h4"> { movie.Title } </Typography> 
      </div>

      <div className={classes.image} >
        <img className={classes.poster} src={movie.Poster} alt="movie poster"/>
        <div> Released: {movie.Year} </div> <br/>
        <div> Rated 
          <h3>{movie.Rated} </h3> 
        </div> 
        <div> <h6> imdbID: { movie.imdbID }</h6> </div>
      </div>

      <div className={classes.info}>

        <div>
          <h4> Genre: </h4>
          <div> - {movie.Genre} </div>
        </div> 

        <div> 
          <h4> Director: </h4>
          <div> - {movie.Director} </div> 
        </div> 
       
        <div> 
          <h4> Starring: </h4>
          <div> { actors } </div>
        </div> 
       
      </div>

      <div className={classes.ratings} > 
          <div> 
            <h4> Critics Ratings: </h4>
            <div> { ratings } </div> <br/>
          </div>
      </div>
      
      <div className={classes.plot} > 
        <h4> Movie Plot: </h4>
        <div> {movie.Plot} </div> 
      </div> 

    </div>
  )
}

const styles = theme => ({
  main: {
    border: '1px solid lightgrey',
    display: 'inline-grid',
    gridTemplateAreas: `
      "title title"
      "image info"
      "plot plot"
      "ratings ratings"
    `,
    gridTemplateColumns: '2fr 3fr',
  },

  title: {
    gridArea: 'title',
    padding: theme.spacing.unit,
    borderBottom: '1px solid lightgrey',
  },

  info: {
    textAlign: 'left',
    gridArea: 'info',
    padding: theme.spacing.unit * 2 ,
  },

  image: {
    gridArea: 'image',
    padding: theme.spacing.unit,
    borderRight: '1px solid lightgrey',
  },

  poster: {
    maxWidth: 125,
    padding: theme.spacing.unit,
  },

  plot: {
    gridArea: 'plot',
    border: '1px solid lightgrey',
    padding: theme.spacing.unit,
    textAlign: 'left',
  },

  ratings: {
    gridArea: 'ratings',
    textAlign: 'left', 
    padding: theme.spacing.unit,
  },

  ratingUnit: {
    display: 'grid',
    gridTemplateAreas:`
      "critic grade"
    `,
    gridTemplateColumns: '3rf 1fr',
  }
})

MovieDisplay.propTypes = propTypes;

export default withStyles(styles)(MovieDisplay)