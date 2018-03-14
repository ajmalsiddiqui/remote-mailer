import axios from 'axios';

import { login } from './login';
import { mail } from './mail';

(() => {
	document.getElementById('login-form').addEventListener('submit', login);
	document.getElementById('submit-mail').addEventListener('submit', mail);
})();