import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import restaurantsReducer from '../restaurants/reducers';
import {loadRestaurants} from '../restaurants/actions';

describe('restaurants', () => {
	describe('initially', () => {
		let store;
		beforeEach(() => {
			store = createStore(restaurantsReducer, applyMiddleware(thunk));
		});
		it('does not have the loading flag set', () => {
			expect(store.getState().loading).toEqual(false);
		});
		it('does not have any error', () => {
			expect(store.getState().error).toEqual('');
		});
	});
	describe('while loading', () => {
		let store;
		beforeEach(() => {
			const api = {
				loadRestaurants: () => new Promise(() => {}),
			};
			store = createStore(
				restaurantsReducer,
				applyMiddleware(thunk.withExtraArgument(api)),
			);
			store.dispatch(loadRestaurants());
		});
		it('sets loading flag', () => {
			expect(store.getState().loading).toEqual(true);
		});
		it('clears the error flag', () => {
			expect(store.getState().error).toEqual('');
		});
	});
	describe('when loading succeeds', () => {
		const records = [
			{id: 1, name: 'Sushi Place'},
			{id: 2, name: 'Pizza Place'},
		];
		let store;
		beforeEach(() => {
			const api = {
				loadRestaurants: () => Promise.resolve(records),
			};
			store = createStore(
				restaurantsReducer,
				applyMiddleware(thunk.withExtraArgument(api)),
			);
			return store.dispatch(loadRestaurants());
		});
		it('stores the restaurants', () => {
			expect(store.getState().records).toEqual(records);
		});
		it('clears the loading flag', () => {
			expect(store.getState().loading).toEqual(false);
		});
		it('should not show any error', () => {
			expect(store.getState().error).toEqual('');
		});
	});
	describe('when loading fails', () => {
		let store;
		const error = 'Restaurants could not be loaded.';
		beforeEach(() => {
			const api = {
				loadRestaurants: () => Promise.reject(error),
			};
			store = createStore(
				restaurantsReducer,
				applyMiddleware(thunk.withExtraArgument(api)),
			);
			return store.dispatch(loadRestaurants());
		});
		it('should stop loader', () => {
			expect(store.getState().loading).toEqual(false);
		});
		it('should show error', () => {
			expect(store.getState().error).toEqual(error);
		});
	});
});
