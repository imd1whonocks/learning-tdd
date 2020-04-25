import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import RestaurantList from '../RestaurantList';

export default function RestaurantScreen() {
	return (
		<Card>
			<CardContent>
				<Typography variant="h5">Restaurants</Typography>
				<RestaurantList />
			</CardContent>
		</Card>
	);
}
