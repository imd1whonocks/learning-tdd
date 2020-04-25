import {
	STORE_RESTAURANTS,
	START_LOADING,
	STORE_RESTAURANTS_FAILED,
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
		default: {
			return {
				...state,
			};
		}
	}
}
// export default combineReducers({reducer});
export default reducer;
