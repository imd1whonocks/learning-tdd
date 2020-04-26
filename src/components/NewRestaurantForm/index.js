import React, {useState} from 'react';
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';

import {createRestaurant} from '../../store/restaurants/actions';

export const NewRestaurantForm = ({createRestaurant}) => {
	const handleSubmit = e => {
		e.preventDefault();
		if (name === '') {
			setShowValidationError(true);
		} else {
            setShowValidationError(false);
            setServerError(false);
			createRestaurant(name)
				.then(() => setName(''))
				.catch(() => setServerError(true));
		}
	};
	const [name, setName] = useState('');
	const [showValidationError, setShowValidationError] = useState(false);
	const [serverError, setServerError] = useState(false);
	return (
		<form onSubmit={handleSubmit}>
			{serverError && (
				<Alert severity="error">
					The restaurant could not be saved. Please try again.
				</Alert>
			)}
			{showValidationError && <Alert severity="error">Name is required</Alert>}
			<TextField
				value={name}
				onChange={e => setName(e.target.value)}
				placeholder="Add Restaurant"
				fullWidth
				variant="filled"
			/>
			<Button
				type="submit"
				variant="contained"
				color="primary"
				data-testid="new-restaurant-submit-button"
			>
				Add
			</Button>
		</form>
	);
};
const mapStateToProps = null;
const mapDispatchToProps = {createRestaurant};
export default connect(mapStateToProps, mapDispatchToProps)(NewRestaurantForm);
