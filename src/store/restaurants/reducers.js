import {combineReducers} from 'redux';
import {STORE_RESTAURANTS, START_LOADING} from './actions';

export const defaultState = {
	records: [],
	loading: false,
};

function reducer(state = defaultState, action = {}) {
	switch (action.type) {
		case START_LOADING: {
			return {
				...state,
				loading: true,
			};
		}
		case STORE_RESTAURANTS: {
			return {
				...state,
				loading: false,
				records: action.records,
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
