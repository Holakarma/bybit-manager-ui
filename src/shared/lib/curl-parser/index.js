import { split } from './shellwords.js';

/**
 * Attempt to parse the given curl string.
 */

export default function (s) {
	if (0 != s.indexOf('curl ')) return;
	var args = rewrite(split(s));
	var out = { method: 'GET', header: {} };
	var state = '';

	args.forEach(function (arg) {
		switch (true) {
			case isURL(arg):
				out.url = arg;
				break;

			case arg == '-A' || arg == '--user-agent':
				state = 'user-agent';
				break;

			case arg == '-H' || arg == '--header':
				state = 'header';
				break;

			case arg == '-d' ||
				arg == '--data' ||
				arg == '--data-ascii' ||
				arg == '--data-raw':
				state = 'data';
				break;

			case arg == '-u' || arg == '--user':
				state = 'user';
				break;

			case arg == '-I' || arg == '--head':
				out.method = 'HEAD';
				break;

			case arg == '-X' || arg == '--request':
				state = 'method';
				break;

			case arg == '-b' || arg == '--cookie':
				state = 'cookie';
				break;

			case arg == '--compressed':
				out.header['Accept-Encoding'] =
					out.header['Accept-Encoding'] || 'deflate, gzip';
				break;
			case arg == '-F' || arg == '--form':
				state = 'form-data';
				break;

			case !!arg:
				switch (state) {
					case 'form-data':
						out.data = out.data || [];
						out.data.push(arg);
						state = '';
						break;
					case 'header':
						var field = parseField(arg);
						out.header[field[0]] = field[1];
						state = '';
						break;
					case 'user-agent':
						out.header['User-Agent'] = arg;
						state = '';
						break;
					case 'data':
						if (out.method == 'GET' || out.method == 'HEAD')
							out.method = 'POST';
						out.header['Content-Type'] =
							out.header['Content-Type'] ||
							'application/x-www-form-urlencoded';
						out.body = out.body ? out.body + '&' + arg : arg;
						state = '';
						break;
					case 'user':
						out.header['Authorization'] = 'Basic ' + btoa(arg);
						state = '';
						break;
					case 'method':
						out.method = arg;
						state = '';
						break;
					case 'cookie':
						out.header['Set-Cookie'] = arg;
						state = '';
						break;
				}
				break;
		}
	});

	return out;
}

/**
 * Rewrite args for special cases such as -XPUT.
 */

function rewrite(args) {
	return args.reduce(function (args, a) {
		if (0 == a.indexOf('-X')) {
			args.push('-X');
			args.push(a.slice(2));
		} else {
			args.push(a);
		}

		return args;
	}, []);
}

/**
 * Parse header field.
 */

function parseField(s) {
	return s.split(/: (.+)/);
}

/**
 * Check if `s` looks like a url.
 */

function isURL(s) {
	return /^https?:\/\//.test(s);
}

// export const parseCurl = (curlCommand) => {
// 	const result = {
// 		method: 'GET',
// 		url: '',
// 		params: {},
// 		body: null,
// 		data: null,
// 		headers: {},
// 	};

// 	let command = curlCommand.trim().replace(/^curl\s+/, '');

// 	const urlMatch = command.match(/'(https?:\/\/[^']+)'/);
// 	if (urlMatch) {
// 		result.url = urlMatch[1];
// 		command = command.replace(urlMatch[0], '').trim();
// 	}

// 	const urlParts = result.url.split('?');
// 	if (urlParts.length > 1) {
// 		const queryParams = new URLSearchParams(urlParts[1]);
// 		queryParams.forEach((value, key) => {
// 			result.params[key] = value;
// 		});
// 		result.url = urlParts[0];
// 	}

// 	const methodMatch = command.match(/-X\s+(\w+)/);
// 	if (methodMatch) {
// 		result.method = methodMatch[1].toUpperCase();
// 		command = command.replace(methodMatch[0], '').trim();
// 	}

// 	const headerMatches = command.matchAll(/-H\s+'([^:]+):\s*([^']+)'/g);
// 	for (const match of headerMatches) {
// 		const [_, key, value] = match;
// 		result.headers[key] = value;
// 	}
// 	command = command.replace(/-H\s+'[^']+'/g, '').trim();

// 	const contentType =
// 		result.headers['Content-Type'] || result.headers['content-type'];
// 	if (contentType) {
// 		if (contentType.includes('application/json')) {
// 			const jsonMatch = command.match(/--data-raw\s+'({.*})'/);
// 			if (jsonMatch) {
// 				try {
// 					result.body = JSON.parse(jsonMatch[1]);
// 				} catch (e) {
// 					console.error('Ошибка при парсинге JSON:', e);
// 				}
// 			}
// 		} else if (
// 			contentType.includes('application/x-www-form-urlencoded') ||
// 			contentType.includes('multipart/form-data')
// 		) {
// 			const formDataMatch = command.matchAll(
// 				/(--data-raw|-d|--form|-F)\s+'([^']+)'/g,
// 			);
// 			const formData = [];
// 			for (const match of formDataMatch) {
// 				const [_, _flag, value] = match;
// 				formData.push(value);
// 			}
// 			if (formData.length > 0) {
// 				result.data = formData.join('&');
// 			}
// 		}
// 	}
// 	return result;
// };
