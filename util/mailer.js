const nodeMailer = require('nodemailer');

const mailerConfig = require('../config').mailer;

const transport = nodeMailer.createTransport({
  service: mailerConfig.service,
  auth: {
    user: mailerConfig.email,
    pass: mailerConfig.pass
  }
});

const mailOptions = {
  from: mailerConfig.from,
  subject: mailerConfig.subject,
  text: mailerConfig.text
};

module.exports = (toEmail, subject, text) => {
	return new Promise((resolve, reject) => {
    mailOptions.to = toEmail;
    if(subject) mailOptions.subject = subject;
    if(text) mailOptions.text = text;
		transport.sendMail(mailOptions, (err, info) => err ? reject(err) : resolve(info));
	});
};