import {STORE_RESTAURANTS} from './actions';

export const defaultState = {
	records: [],
};

function reducer(state = defaultState, action = {}) {
	switch (action.type) {
		case STORE_RESTAURANTS: {
			return {
				...state,
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

export default reducer;
