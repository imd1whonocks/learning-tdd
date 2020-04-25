export const STORE_RESTAURANTS = 'STORE_RESTAURANTS';
export const START_LOADING = 'START_LOADING';
export const STORE_RESTAURANTS_FAILED = 'STORE_RESTAURANTS_FAILED';
export const CREATE_RESTAURANT = 'CREATE_RESTAURANT';
export const ADD_RESTAURANT = 'ADD_RESTAURANT';

export const loadRestaurants = () => (dispatch, getState, api) => {
	dispatch(startLoading());
	api
		.loadRestaurants()
		.then(records => {
			dispatch(storeRestaurants(records));
		})
		.catch(err => {
			dispatch(storeRestaurantsFailed('Restaurants could not be loaded.'));
		});
};

const storeRestaurants = records => ({
	type: STORE_RESTAURANTS,
	records,
});

const startLoading = () => ({type: START_LOADING});

const storeRestaurantsFailed = error => ({
	type: STORE_RESTAURANTS_FAILED,
	payload: error,
});

export const createRestaurant = name => (dispatch, getState, api) => {
	return api
		.createRestaurant(name)
		.then(restaurant => {
			dispatch(addRestaurant(restaurant));
		})
		.catch(err => {
			console.error(err);
		});
};
const addRestaurant = restaurant => ({
	type: ADD_RESTAURANT,
	payload: restaurant,
});
