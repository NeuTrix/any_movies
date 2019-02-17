import { expect } from 'chai';
import store, { defaultState } from './store';

describe('The store object', () => {
  const state = store.getState();

  it('...is defined', () => {
    expect(state).not.to.eql('undefined')
  });

  it('...has a default state object', () => {
    expect(state).to.be.an('object')
  });

  it('...has a default prop currMovie', () => {
    expect(state).to.have.property('currMovie')
  });

  it('...has a default prop username', () => {
    expect(state).to.have.property('username')
  });
});
