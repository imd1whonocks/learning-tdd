import axios from 'axios';
const client = axios.create({
	baseURL: 'https://api.outsidein.dev/e9wqUy7ItMPMMjoWOtBBmdEdlCYhv1l8',
});
const api = {
	loadRestaurants() {
		return client.get('/restaurants').then(response => response.data);
	},
};

export default api;
