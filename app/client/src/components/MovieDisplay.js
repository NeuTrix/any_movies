import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';


// include props declartaions (classes)
const propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  movie: PropTypes.instanceOf(Object).isRequired,
}

class MovieDisplay extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
      
  }

  render() {
    const { classes, movie } = this.props

    return(
      <div className={classes.main} >
        <div style={{gridArea: 'mTitle'}} >
          { movie.Title }
        </div> 
        <div style={{gridArea: 'mYear'}} >
        </div> 
        <div style={{gridArea: 'mPoster'}} >p</div> 
        <div style={{gridArea: 'mDescr'}} >
        
        </div> 
        <div style={{gridArea: 'mLetter'}} >l</div> 
        <div style={{gridArea: 'cRating'}} >r</div> 
      </div>
    )
  }
}

const styles = {
  main: {
    display: 'inline-grid',
    gridTemplateAreas: `
      "mTitle mYear"
      "mPoster mDescr"
      "mLetter cRating"
    `,
    gridTemplateColumns: ' 2fr 3fr',
  },

}

export default withStyles(styles)(MovieDisplay)
