
import deepfreeze from 'deep-freeze';
import { expect } from 'chai';
import favouritesReducer, { initialState } from './favouritesReducer';
// test objects
import { movie1, movie2 } from '../../testHelpers';

// action creators
import {
	checkIsFavouritedFailure,
	checkIsFavouritedRequest,
	checkIsFavouritedSuccess,
	toggledFavouritedStatus,
	updateIsFavouritedStatus,
	isFavourited,
} from './favouritesActions';

// ensure an immutable previous state object for tests
const prevState = initialState;
deepfreeze(prevState);
// how to test thunks?

describe('Favourites reducer default actions', () => {
	it('...undefined action returns default previous state', () => {
		expect(favouritesReducer()).to.eql(initialState);
	});
});

describe('The default state properties', () => {
	it('... has a the expected number of default properties', () => {
		expect(Object.keys(initialState).length).to.eql(5);
	});

	it('...has a `apiStatus` property (object)', () => {
		expect(initialState).to.have.property('apiStatus')
			.to.be.a('object');
	});

	it('...has a `dictionary` property (object)', () => {
		expect(initialState).to.have.property('dictionary')
			.to.be.a('object');
	});
});

describe('The checkFavouritedFailure` action', () => {
	const action = checkIsFavouritedFailure();
	const nextState = favouritesReducer(prevState, action);

	it('... changes the state', () => {
		expect(prevState).not.to.eql(nextState);
	});

	it('... sets the apiStatus isFetching state to false ', () => {
		expect(nextState.apiStatus.isFetching).to.eql(false)
	});
});

describe('The checkFavouritedSuccess` action', () => {
	const action = checkIsFavouritedSuccess();
	const nextState = favouritesReducer(prevState, action);

	it('... changes the state', () => {
		expect(prevState).not.to.eql(nextState);
	});

	it('... sets the apiStatus isFetching state to false ', () => {
		expect(nextState.apiStatus.isFetching).to.eql(false)
	});
});

describe('The checkIsFavouritedRequest` action', () => {
	const action = checkIsFavouritedRequest();
	const nextState = favouritesReducer(prevState, action);

	it('... changes the state', () => {
		expect(prevState).not.to.eql(nextState);
	});

	it('... sets the apiStatus isFetching state to true ', () => {
		expect(nextState.apiStatus.isFetching).to.eql(true)
	});
});

describe('The updateIsFavouritedStatus ` action', () => {
	const action = updateIsFavouritedStatus(true);
	const nextState = favouritesReducer(prevState, action);

	it('... changes the state', () => {
		expect(prevState).not.to.eql(nextState);
	});

	it('... sets the apiStatus isFetching state to true ', () => {
		console.log(99, '==>', nextState);
		expect(nextState.favourited).to.eql(true)
	});
});
