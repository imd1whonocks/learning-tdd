import {
	STORE_RESTAURANTS,
	START_LOADING,
	STORE_RESTAURANTS_FAILED,
	ADD_RESTAURANT,
} from './actions';

export const defaultState = {
	records: [],
	loading: false,
	error: '',
};

function reducer(state = defaultState, action = {}) {
	switch (action.type) {
		case START_LOADING: {
			return {
				...state,
				loading: true,
				error: '',
			};
		}
		case STORE_RESTAURANTS: {
			return {
				...state,
				loading: false,
				records: action.records,
				error: '',
			};
		}
		case STORE_RESTAURANTS_FAILED: {
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		}
		case ADD_RESTAURANT: {
			const arr = [...state.records, action.payload];
			return {
				...state,
				records: arr,
			};
		}
		default: {
			return {
				...state,
			};
		}
	}
}
// export default combineReducers({reducer});
export default reducer;
