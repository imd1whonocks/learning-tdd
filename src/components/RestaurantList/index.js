import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';

import {loadRestaurants} from '../../store/restaurants/actions';

export const RestaurantList = ({loadRestaurants, restaurants, loading}) => {
	useEffect(() => {
		loadRestaurants();
	}, [loadRestaurants]);
	if (loading) return <CircularProgress data-testid="loading-indicator" />;
	return (
		<List>
			{restaurants.map(restaurant => (
				<ListItem key={restaurant.id}>
					<ListItemText>{restaurant.name}</ListItemText>
				</ListItem>
			))}
		</List>
	);
};
const mapStateToProps = ({restaurants}) => {
	return {restaurants: restaurants.records, loading: restaurants.loading};
};
const mapDispathToProps = dispatch => {
	return {
		loadRestaurants: params => dispatch(loadRestaurants(params)),
	};
};
export default connect(mapStateToProps, mapDispathToProps)(RestaurantList);
