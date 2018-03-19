import axios from 'axios';

import { login } from './login';
import { mail } from './mail';

(() => {
	console.log('attaching handlers');
	if(document.getElementById('login-form')) {
		document.getElementById('login-form').addEventListener('submit', login);
	}
	else if (document.getElementById('mail-form')) {
		document.getElementById('mail-form').addEventListener('submit', mail);
	}
})();