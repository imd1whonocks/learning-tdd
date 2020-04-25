import React from 'react';
import {render} from '@testing-library/react';
import {RestaurantList} from '../RestaurantList';

describe('Restaurant List', () => {
	const restaurants = [
		{id: 1, name: 'Sushi Place'},
		{id: 2, name: 'Pizza Place'},
	];
	let loadRestaurants;
	let context;
	const renderWithProps = (newprops = {}) => {
		const props = {
			loadRestaurants: jest.fn().mockName('loadRestaurant'),
			restaurants,
			loading: false,
			...newprops,
		};
		loadRestaurants = props.loadRestaurants;
		context = render(<RestaurantList {...props} />);
	};
	it('loads restaurants on first render', () => {
		renderWithProps();
		expect(loadRestaurants).toHaveBeenCalled();
	});
	it('should show loader while loading', () => {
		renderWithProps({loading: true});
		const {queryByTestId} = context;
		expect(queryByTestId('loading-indicator')).not.toBeNull();
	});
	describe('when loading succeeds', () => {
		beforeEach(() => {
			renderWithProps();
		});

		it('should not show loader once data has loaded', () => {
			const {queryByTestId} = context;
			expect(queryByTestId('loading-indicator')).toBeNull();
		});
		it('should not show error once data has loaded', () => {
			const {queryByText} = context;
			expect(queryByText('Restaurants could not be loaded.')).toBeNull();
		});
		it('displays the restaurants', () => {
			const {queryByText} = context;
			expect(queryByText('Sushi Place')).not.toBeNull();
			expect(queryByText('Pizza Place')).not.toBeNull();
		});
	});
	describe('when loading fails', () => {
		beforeEach(() => {
			renderWithProps({error: 'Restaurants could not be loaded.'});
		});
		it('should display a error message', () => {
			const {queryByText} = context;
			expect(queryByText('Restaurants could not be loaded.')).not.toBeNull();
		});
	});
});
