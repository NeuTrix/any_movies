import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import FavouritesPage from './FavouritesPage';
import { getFavourites } from '../../actions/favouritesActions';
import { omdb_url } from '../../helpers/api.helper'; // movie data

import { omdb_poster_url } from '../../helpers/api.helper'; // movie posters
const propTypes = {
	currUser: PropTypes.instanceOf(Object).isRequired,
};

class FavouritesContainer extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			favourites: [1, 2, 3],
		}
	}

	componentDidMount() {
		const { currUser } = this.props;
		getFavourites(currUser.id)
			.then(resp => {
				let urls = resp.data.map(fav => {
					return (
						<a 
							key={fav.id} 
							href={`${omdb_url}&t=${fav.favourited_id}`}
						>
							<img
								src={`${omdb_poster_url}&i=${fav.favourited_id}`}
								alt="favorite movie poster"
								height="100"
							>
							</img>
						</a>
					)
				})
				console.log('xxxx=>', urls)

				return urls
			})
			.then(resp => this.setState({ favourites: resp }))
			.catch(err => console.log('Err: FavouritesContainer', err));
	}

	render() {
		return (
			// <FavouritesPage
			// 	favsArray={this.state.favourites}
			// />
			<div>
				{this.state.favourites}
			</div>
		)
	}
}


FavouritesContainer.propTypes = propTypes;

export default FavouritesContainer;