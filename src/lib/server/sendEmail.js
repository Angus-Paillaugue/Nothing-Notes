import nodemailer from 'nodemailer';
import { EMAIL_SMTP_PASSWORD } from '$env/static/private';

export async function sendEmail({ subject, text, to }) {
	try {
		const transporter = nodemailer.createTransport({
			host: 'smtp-relay.brevo.com',
			port: 587,
			secure: false,
			auth: {
				user: 'angus.paillaugue40@gmail.com',
				pass: EMAIL_SMTP_PASSWORD
			}
		});
		const info = await transporter.sendMail({
			from: 'angus.paillaugue40@gmail.com',
			to,
			subject: subject,
			text: text
		});

		return info;
	} catch (error) {
		throw new Error('Error sending email : ', error);
	}
}
