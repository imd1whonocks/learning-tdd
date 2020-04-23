import React from 'react';
import {Provider} from 'react-redux';
import store from './store';
import RestaurantScreen from './components/RestaurantScreen';

const App = () => {
	return (
		<Provider store={store}>
			<RestaurantScreen />
		</Provider>
	);
};

export default App;
