import axios from 'axios';

const loginUrl = '/api/employee/login';

export const login = event => {
	event.preventDefault();
	const data = {
		"empId": event.target[0].value,
		"password": event.target[1].value
	}
	axios.post(loginUrl, data)
		.then(response => {
			console.log(response.data);
			if(parseInt(response.data.status) === 200) {
				// TODO: redirect to mail page
				console.log('Logged in');
			}
			else {
				console.log('not authenticated');
			}
		})
		.catch(err => {
			console.log(err);
		});
};