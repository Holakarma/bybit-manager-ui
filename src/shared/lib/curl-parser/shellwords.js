const scan = (string, pattern, callback) => {
	let result = '';
	while (string.length > 0) {
		const match = string.match(pattern);
		if (match) {
			result += string.slice(0, match.index);
			result += callback(match);
			string = string.slice(match.index + match[0].length);
		} else {
			result += string;
			string = '';
		}
	}
	return result;
};

const split = (line = '') => {
	const words = [];
	let field = '';
	scan(
		line,
		/\s*(?:([^\s\\\'\"]+)|'((?:[^\'\\]|\\.)*)'|"((?:[^\"\\]|\\.)*)"|(\\.?)|(\S))(\s|$)?/,
		(match) => {
			const [raw, word, sq, dq, escape, garbage, seperator] = match;

			if (garbage != null) {
				throw new Error('Unmatched quote');
			}
			field += word || (sq || dq || escape).replace(/\\(?=.)/, '');
			if (seperator != null) {
				words.push(field);
				field = '';
			}
		},
	);
	if (field) {
		words.push(field);
	}
	return words;
};

const escape = (str = '') => {
	if (str == null) {
		return "''";
	}
	return str
		.replace(/([^A-Za-z0-9_\-.,:\/@\n])/g, '\\$1')
		.replace(/\n/g, "'\n'");
};

export { escape, split };
