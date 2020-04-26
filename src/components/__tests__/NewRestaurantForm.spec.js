import React from 'react';
import {render, act} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import flushPromises from 'flush-promises';
import {NewRestaurantForm} from '../NewRestaurantForm';
describe('New Restaurant Form', () => {
	const restaurantName = 'Sushi Place';
	const requiredError = 'Name is required';
	let context;
	let createRestaurant;

	beforeEach(() => {
		createRestaurant = jest.fn().mockName('crRestaurant');
		context = render(<NewRestaurantForm createRestaurant={createRestaurant} />);
	});
	describe('initially', () => {
		beforeEach(() => {});
		it('doesnt show validation error', () => {
			const {queryByText} = context;
			expect(queryByText(requiredError)).toBeNull();
		});
	});
	describe('when filled in', () => {
		beforeEach(async () => {
			createRestaurant.mockResolvedValue();
			const {getByPlaceholderText, getByTestId} = context;

			await userEvent.type(
				getByPlaceholderText('Add Restaurant'),
				restaurantName,
			);
			userEvent.click(getByTestId('new-restaurant-submit-button'));
			return act(flushPromises);
		});
		it('does not display a validation error', () => {
			const {queryByText} = context;
			expect(queryByText(requiredError)).toBeNull();
		});
		it('calls createRestaurant with the name', () => {
			expect(createRestaurant).toHaveBeenCalledWith(restaurantName);
		});
		it('clears the name', () => {
			const {getByPlaceholderText} = context;
			expect(getByPlaceholderText('Add Restaurant').value).toEqual('');
		});
	});
	describe('when empty', () => {
		beforeEach(async () => {
			createRestaurant.mockResolvedValue();
			const {getByPlaceholderText, getByTestId} = context;
			await userEvent.type(getByPlaceholderText('Add Restaurant'), '');
			userEvent.click(getByTestId('new-restaurant-submit-button'));
			return act(flushPromises);
		});
		it('shows a validation error', () => {
			const {queryByText} = context;
			expect(queryByText(requiredError)).not.toBeNull();
		});
		it('does not call createRestaurant', () => {
			expect(createRestaurant).not.toHaveBeenCalled();
		});
	});
	describe('when correcting a validation error', () => {
		beforeEach(async () => {
			createRestaurant.mockResolvedValue();
			const {getByPlaceholderText, getByTestId} = context;
			await userEvent.type(getByPlaceholderText('Add Restaurant'), '');
			userEvent.click(getByTestId('new-restaurant-submit-button'));
			await act(flushPromises);
			await userEvent.type(
				getByPlaceholderText('Add Restaurant'),
				restaurantName,
			);
			userEvent.click(getByTestId('new-restaurant-submit-button'));
			return act(flushPromises);
		});
		it('clears validation error', () => {
			const {queryByText} = context;
			expect(queryByText(requiredError)).toBeNull();
		});
	});
});
