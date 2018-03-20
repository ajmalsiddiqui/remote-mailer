import axios from 'axios';

const loginUrl = '/api/login';

export const login = event => {
	console.log('login');
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
				window.localStorage.setItem('token', response.data.token);
				window.location = '/client/mail?token=' + response.data.token;
			}
			else {
				window.location = '/client?message=Login+failed+check+username+password';
				console.log('not authenticated');
			}
		})
		.catch(err => {
			window.location = '/client?message=Login+failed+check+username+and+password';
			console.log(err);
		});
};