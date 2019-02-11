import React, { Component } from 'react';
import PropTypes from 'prop-types';
// material ui
import FavouriteTwoTone from '@material-ui/icons/FavoriteTwoTone';
import { IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
// custom
import {
	addFavourite,
	isFavourited,
	removeFavourite,
} from '../../actions/favouritesActions';

const propTypes = {
	classes: PropTypes.instanceOf(Object).isRequired,
	currItemId: PropTypes.string.isRequired,
	currItemType: PropTypes.string.isRequired,
	currUserId: PropTypes.number.isRequired,
};

class FavouriteButton extends Component {

	constructor(props) {
		super(props);
		this.state = {
			data: {},
			// isFavourited: false,
			favoured: false, // id of the favourite instance (not favouriteD)
		};
		this.onClick = this.onClick.bind(this);
	}

	componentDidMount() {
		const { currItemId, currItemType, currUserId } = this.props;
		const	data = {
			favourited_id: currItemId,
			favourited_type: currItemType,
			user_id: currUserId,
		};
		isFavourited(data)
			.then((resp) => {
				console.log('DidMount from favbutton===>', resp.data);
				this.setState({
					data,
					// favoured: resp.data.id,
					favoured: resp.data.exists,
				});
		});
	}

	componentDidUpdate(prevProps) {
		const { currItemId, currItemType, currUserId } = this.props;
		const	data = {
			favourited_id: currItemId,
			favourited_type: currItemType,
			user_id: currUserId,
		};

		if (prevProps.currItemId !== currItemId) {
			isFavourited(data)
				.then((resp) => {
					console.log('from favbutton===>', resp.data);
					this.setState({
						data,
						// favoured: resp.data.id,
						favoured: resp.data.exists,
					});
				});
		}
	}

	onClick(e) {

		e.preventDefault();
		const { data, favoured } = this.state;

		// check to see if favourited in the api db
		isFavourited(data)
			.then((resp) => {
				console.log('UPDATE from favbutton ==>', resp.data);
				this.setState({
					// favoured: resp.data.id,
					favoured: resp.data.exists,
				});
				return resp;
			})
			.then((resp) => {
				if (favoured) {
					removeFavourite(data); // remove a favourited item
					this.setState({ favoured: false });
				} else {
					addFavourite(data); // add to the faves list
					this.setState({ favoured: true });
				}
			})
			.then(resp => {
				this.setState({
					// favoured: resp.data.id,
					favoured: resp.data.exists,
				})
			})
			.catch(err => {
				console.log('FavouriteButton', err)
			})
	}

	render() {
		const { classes } = this.props;

		return (

			<IconButton
				// disabled
				size="large"
				onClick={this.onClick}
			>
				{/* <Typography variant="h1" > */}
				<FavouriteTwoTone
					className={classes.favourited}
					style={{ color: this.state.favoured ? 'orangered' : 'black' }}
				/>
				{/* </Typography> */}
			</IconButton>
		);
	}
}

const styles = theme => ({

	favourited: {
		alignItems: 'center',
		borderRadius: theme.shape.borderRadius,
		color: 'orangered',
		display: 'flex',
		height: '100%',
		justifyContent: 'center',
		marginLeft: 0,
		position: 'absolute',
		width: '100%',
	},

	unfavourited: {
		alignItems: 'center',
		borderRadius: theme.shape.borderRadius,
		color: 'orangered',
		display: 'flex',
		height: '100%',
		justifyContent: 'center',
		marginLeft: 0,
		position: 'absolute',
		width: '100%',
	},

});

FavouriteButton.propTypes = propTypes;

export default withStyles(styles)(FavouriteButton);
