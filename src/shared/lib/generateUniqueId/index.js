export const uniqueId = () =>
	`${Date.now()}-${Math.floor(Math.random() * 100000)}`;
