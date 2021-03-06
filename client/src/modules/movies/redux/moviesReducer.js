// reducer for movies actions
import {
	FETCH_MOVIE_FAILURE,
	FETCH_MOVIE_REQUEST,
	FETCH_MOVIE_SUCCESS,

	GET_ALL_MOVIES_SUCCESS, // update with full movie library (from api)
	GET_ALL_MOVIES_REQUEST,
	GET_ALL_MOVIES_FAILURE,

	// Registraion
	REGISTER_MOVIE_FAILURE,
	REGISTER_MOVIE_NOT_NEEDED,
	REGISTER_MOVIE_REQUEST,
	REGISTER_MOVIE_SUCCESS,
	VALIDATE_MOVIE_REGISTRATION,
} from '../../helpers/constants';

export const initialState = {
	apiStatus: {
		isFetching: false,
		message: '',
		status: '',
	},
	current: {
		imdbID:''
	},
	imdbID: '',
	title: '',
	poster: '',
	indexes:'',
	dictionary: {},
	favourited: false, // change name to isMovieFavourited...
	registered: false,
};

//  reducer to handle nested dictionary state
export function dictionaryReducer(state = {}, action = {}) {
	const { type, payload } = action;

	switch (type) {
		case FETCH_MOVIE_SUCCESS:
			return {
				...state, 
				...payload.dictionary, // add the movie details object
			}
		default: 
			return state;
	}
}; 

export default function moviesReducer(state = initialState, action = {}) {
	const { type, payload } = action; // deconstruct the action item

	switch (type) {
	// request to the OMBD api
		case FETCH_MOVIE_REQUEST:
		case GET_ALL_MOVIES_REQUEST:
		case REGISTER_MOVIE_REQUEST:
			return { 
				...state, 
				...{ 
					apiStatus: { 
						isFetching: true,
						message: 'Requesting movie',
						status: 'requesting',
					},
				}
			};
		
		// hydrate the application with movie data
		case FETCH_MOVIE_SUCCESS:
			const { dictionary, movieID } = payload
			const movie = dictionary[movieID]
			return {
				...state,
				...{
					imdbID: movie.imdbID,
					current: movie,
					title: movie.Title,
					poster: movie.Poster,
					// allow dictionary object ot accumulate/ cache movie search objects 
					dictionary: dictionaryReducer(state.dictionary, action),
					apiStatus: {
						isFetching: false,
						message: 'Successfully recieved this movie',
						status: 'success',
					},
				}
			};
		// update dictionary with full saved library from app api
		case GET_ALL_MOVIES_SUCCESS:
			return {
				...state,
				...{
					dictionary: payload.dictionary,
					indexes: payload.indexes,
					apiStatus: {
						isFetching: false,
						message: 'Successfully update this movie dictionary',
						status: 'success',
					},
				}
			};

		case REGISTER_MOVIE_NOT_NEEDED:
		case REGISTER_MOVIE_SUCCESS:
			return {
				...state,
				...{
					apiStatus: {
						isFetching: false,
						message: 'Successfully registered this movie',
						status: 'success',
					},
				}
			}
			
		// log failures
		case FETCH_MOVIE_FAILURE:
		case GET_ALL_MOVIES_FAILURE:
		case REGISTER_MOVIE_FAILURE:
			const { error } = payload
			return {
				...state,
				...{
					apiStatus: {
						isFetching: false,
						message: `Error getting movie: \n ${error}`,
						status: 'error'
					},
				},
			};

			case VALIDATE_MOVIE_REGISTRATION:
				return {
					...state,
					...{ registered: payload.registered }
				}

		default:
			return state;
	}
}


