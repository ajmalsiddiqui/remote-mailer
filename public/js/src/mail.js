import axios from 'axios';

const mailUrl = '/api/mail';

export const mail = event => {
	event.preventDefault();
	console.log('mail');
	const data = {
		"emails": event.target[0].value,
		"subject": event.target[1].value,
		"text": event.target[2].value
	}
	const token = window.localStorage.getItem('token');
	axios.get(mailUrl, {
		params: data,
		headers: {
			'x-access-token': token
		}
	})
	.then(response => {
		console.log(response.data);
		if(parseInt(response.data.status) === 200) {
			// TODO: redirect to mail page
			console.log('Sent');
			window.location = '/client/mail?token=' + token;
		}
		else {
			console.log('not authenticated');
			window.location = '/client/'
		}
	})
	.catch(err => {
		console.log(err);
	});
};