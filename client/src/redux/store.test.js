import { expect } from 'chai';
import store, { defaultState } from './store';

xdescribe('The store object', () => {
	const state = store.getState();
	it('...is defined', () => {
		expect(state).not.to.eql('undfined');
	});

	it('...has a default state object', () => {
		expect(state).to.be.an('object');
	});

	it('...has a default prop movies', () => {
		expect(state).to.have.property('movies');
	});

	it('...has a default prop users', () => {
		expect(state).to.have.property('users');
	});

	it('...has a default prop favourites', () => {
		expect(state).to.have.property('favourites');
	});
	
	it('...has a default prop favourited', () => {
		expect(state).to.have.property('favourited');
	});

	it('...has a default prop showCommentsForm', () => {
		expect(state).to.have.property('showCommentsForm');
	});

	it('...has a default prop comments', () => {
		expect(state).to.have.property('comments');
	});
});
