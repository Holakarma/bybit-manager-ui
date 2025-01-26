function obfuscateEmail(email) {
	// Проверяем, что это валидный email
	if (typeof email !== 'string' || !email.includes('@')) {
		console.error('Invalid email format');
		return email;
	}

	const [localPart] = email.split('@');
	const obfuscatedLocalPart = localPart.slice(0, 4);

	return `${obfuscatedLocalPart}**@**`;
}

export default obfuscateEmail;
