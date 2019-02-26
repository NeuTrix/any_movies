import axios from 'axios';
import { normalize, schema } from 'normalizr';
import { actionCreator } from '../../helpers';

import {
	FETCH_COMMENTS_FAILURE,
	FETCH_COMMENTS_REQUEST,
	FETCH_COMMENTS_SUCCESS,
	SET_COMMENTABLE,
} from '../../helpers/constants';

// normalizr schema
export const comment = new schema.Entity('comments'); // normalize data
export const commentsListSchema = [comment]; // shorthand for schema.Array...

// update the api request property
export const fetchCommentsRequest = actionCreator(
	FETCH_COMMENTS_REQUEST
);

// manage the data returned from comments GET call api
// need to factor out SET_COMMENTS from the success action
export const fetchCommentsSuccess = actionCreator(
	FETCH_COMMENTS_SUCCESS,
	'indexes', 
	'dictionary',
);

// captures the error messages on fail
export const fetchCommentsFailure = actionCreator(
	FETCH_COMMENTS_FAILURE, 
	'error',
);

 // set the current comment
export const setCommentable = actionCreator(
	SET_COMMENTABLE,
	'commentableID',
	'commentableType',
);

// retrieve the comments object (array of objs) from the api
export function getComments(commentableID, commentableType) {
	const path = commentableType === 'Comment' ? 'comments' : 'movies';
	// using thunk middleware to return a fn from an action
	// named it `thunk` to clear linting err re:anonymous fucntions
	return function thunk(dispatch) {
		// alert state of request action
		dispatch(fetchCommentsRequest());
		// return the axios promise with the data/status
		return axios.get(`/api/${path}/${commentableID}/comments`)
			// normalize the response data
			.then((resp) => {
				console.log('--#getComments data-->', resp.data);
				return resp.data ? resp.data : 'no data'
			})
			.then((data) => {
				// normalize the data
				const normed = normalize(data, commentsListSchema);
				const indexes = normed.result; // an array of indices
				const dictionary = normed.entities.comments; // an object map
				dispatch(fetchCommentsSuccess(indexes, dictionary));
			})
			// set the current commentable object id
			.then(() => dispatch(setCommentable(commentableID, commentableType)))
			.catch((error) => {
				dispatch(fetchCommentsFailure(error));
				return console.log('---#getComments error--->', error);
			});
	};
}
