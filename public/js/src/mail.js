import axios from 'axios';

const mailUrl = '/api/employee/mail';

export const mail = event => {
	console.log('mail')
	event.preventDefault();
	const data = {
		"emails": event.target[0].value,
		"subject": event.target[1].value,
		"text": event.target[2].value
	}
	axios.get(mailUrl, {
		params: data
	})
	.then(response => {
		console.log(response.data);
		if(parseInt(response.data.status) === 200) {
			// TODO: redirect to mail page
			console.log('Sent');
		}
		else {
			console.log('not authenticated');
		}
	})
	.catch(err => {
		console.log(err);
	});
};