import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import {loadRestaurants} from '../../store/restaurants/actions';

export const RestaurantList = ({loadRestaurants, restaurants}) => {
	useEffect(() => {
		loadRestaurants();
	}, [loadRestaurants]);
	return (
		<ul>
			{restaurants.map(restaurant => (
				<li key={restaurant.id}>{restaurant.name}</li>
			))}
		</ul>
	);
};
const mapStateToProps = ({restaurants}) => {
	return {restaurants: restaurants.records};
};
const mapDispathToProps = dispatch => {
	return {
		loadRestaurants: params => dispatch(loadRestaurants(params)),
	};
};
export default connect(mapStateToProps, mapDispathToProps)(RestaurantList);
