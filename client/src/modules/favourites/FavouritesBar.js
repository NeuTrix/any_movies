import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const propTypes = {
	posters: PropTypes.instanceOf(Array).isRequired,
}

const FavouritesBar = ({ classes, posters }) => {
	return (
      <div className={classes.root}>
			  <div className={classes.posters}>{ posters }</div>
		  </div>
	);
};

const styles = {
  posters: {
    display: 'inline-flex',
  },
	root: {
    overflow: 'auto',
  },
}


FavouritesBar.propTypes = propTypes;

export default withStyles(styles)(FavouritesBar);
