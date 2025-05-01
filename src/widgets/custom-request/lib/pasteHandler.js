import parseCurl from 'shared/lib/curl-parser';
import { formatJson } from 'shared/lib/format-json';

/* 

curl 'https://chat.qwen.ai/api/v1/chats/?page=1' \
  -H 'Accept-Language: ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7' \
  -H 'Cache-Control: no-cache' \
  -H 'Connection: keep-alive' \
  -b 'x-ap=eu-central-1; _gcl_au=1.1.726200777.1746088652; _bl_uid=6emjIa2y5wm4vd3Idmt4g1bxyRav; cna=zCCaID5AemECAdQVExKFiD9d; sca=f169ed5c; xlly_s=1; cnaui=3961ad7f-0133-48b9-b12b-339f0c33cfe0; aui=3961ad7f-0133-48b9-b12b-339f0c33cfe0; acw_tc=0a03e53417460948734196694e59784028f027a419fee145c5d58477cfae8b; ssxmod_itna=Qq+x0D9DRiD=i=qDtG0YGCiaGOGRiHqDmxBP011D+xQvY08D6ADB4ZTox0==YKHN=WeRiqbqYrDDsezi4GCDfqKDEDWPo7qQ7Do+CKziDubPgUiDOeeopGA2b5Lu=oEhSdwYh=+IbYxB3DbqDyKixmteGGD0oDt4DIDAYDDxDWDYExxGUtDG=D7ORQgju3v4GWecEDH2nWxDLtIjrvADDBDD6Dx7jajnDD0kL6bQveoYaDY3ivS7H=5YO2IeDMFxGXzB8qInFjc9GiTt82t=EKxB=nxBjtp=u1v2RrZlWbWB=lohdPlMhp3GeUiqQ0DCwr42qtuDrD83qYtTVlxb95Pg4DGf+Chd=0imY1ju1+8i2we/hDL2tfjtKo53A5NiqI2YYO5ZB51QeSThOAxUlx5RD4D; ssxmod_itna2=Qq+x0D9DRiD=i=qDtG0YGCiaGOGRiHqDmxBP011D+xQvY08D6ADB4ZTox0==YKHN=WeRiqbqYxD3bKY6jETIQNfwvNGq4EA7WAdPD; token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM5NjFhZDdmLTAxMzMtNDhiOS1iMTJiLTMzOWYwYzMzY2ZlMCIsImV4cCI6MTc0ODY4NzQ0MH0.sdgbrW5Rn6m7gSEL-oqN46ofydyBBsW18FcOjZdYLbc; atpsida=81fb760659ff7ba8529efda0_1746095440_3; SERVERID=86b8fde97f3c2a34e8850da639cea88d|1746095441|1746094873; tfstk=gUOEcOOfTXhF3rdEqNfz31up15fd66mjtQs5rUYlRMjnvQ1PrG8zApTWr_lPj3Ih-gXlUNxP-4BhEDCgsG_myBsk-PbPkn63ZDIh48-V8wbne2EgJC-4NWiKpUVPN_mjcjGXJ2CRZmg-X2tNvaLGqV6hI4Y5-_mjcf_YVcqdZ3NeJ9UwSGQPrkXHqN4GXay3x3jhIlbVk_jkq34GsZQ7E7flEf0NyGjlZ_xlsb5VqiNNu907yBjAFR1ALiYhb7-J_wXUpejaZ7AwQ9S0GGPuZC7ezZdQ4Sk5mKIChiKi1W5ySa-Nhpo4T38kkLXwak0BmUxp_6CqF2B2Id9fLdo3aGOCztflQzVk7ej60B5mil79Ie9k9HzzZwdBGTSAQ4VRF1AfnKxUyqLGtaxRHQiY9MYkkIpfgXrA8dYV_gyQ2NYBKQpUq8WhWNSj7V8bRveb0glAS8eRpdQNc23Le8BhWNSj7Vy8e9CA7igKJ; isg=BPHxoG6IPZMyU5GHcXqVCWZOAH2L3mVQqkuKjdMDvbp2-ghNcSt_IEwMHpacMv2I' \
  -H 'Pragma: no-cache' \
  -H 'Referer: https://chat.qwen.ai/c/142b4b8b-2c15-4bc4-8d4f-4c3cff911be7' \
  -H 'Sec-Fetch-Dest: empty' \
  -H 'Sec-Fetch-Mode: cors' \
  -H 'Sec-Fetch-Site: same-origin' \
  -H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36' \
  -H 'accept: application/json' \
  -H 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM5NjFhZDdmLTAxMzMtNDhiOS1iMTJiLTMzOWYwYzMzY2ZlMCIsImV4cCI6MTc0ODY4MDY1OH0.6x6bxpBoqazJwe-6lVQK6M1lO_Y5pioFcy8_5AwDerI' \
  -H $'bx-ua: 231\u0021ZW/3D+mUj5z+jjfB2+3aZ9zjUq/YvqY2leOxacSC80vTPuB9lMZY9mRWFzrwLEUoeOdubM13jYnlGpKwgQp262tIOtzB6EqvlgsGWxto0o4GBBSWEl7t3ryfgMZyLNDfEwRnGjKg7VpXONM2JhpubdSlUvQRyA6B9KNnBYFE2533gKNG9wy+hHK+ZzY7wHtH4j9PkhzKlDnVVhJsDiiRSM6+3kop0Q3oyE+jauHhUqTEElHGHkE+++3+qCS4+ItUqkQw83sHo+r+0N6L5qMnzf5ScgBDA6oa1nROiYzirmTBufpLQsPlzW4AvMvPemXs9xnEJJTApjwlBop18ct80wIOAFWgGhC/GdtGBz2NOAbHzAAdS7JLCcLLSz6lbcAuZgwMF26CSNLxuerXSXZC4xXsob6cQXkEYb5YCdin7RQtL5UD93AGQgQCRxy4ujMXRWFpzGFQCXVxux5M/qBAiDsmroQpxTlEc1zzm/ad9S1iq3y98YRQc+DO6zeT2n+cPrjRzmJvRTo1naJAaW4QYPfKpzfxnLwvUlQ16pBmxkHjaMLYb0i49CbnczpLUfsZ+vUvPfGXkkOh+iAC4vbTDGnVUJATI7P9ETCHtgOnwK96Br/BiKz8qopn9yz0CXtWjmyaIBtIMZifawVXIhBKFv3feG6UwKh3GI6dCDeMz+JBax2U9G9l6cUWFznYfGPY40jpNFOgEeCdoLJzsIz4qCrtak/A8prYRDLiZe183ohUQsQtjUmEZLmJaKdUk1BGuW0bqaqhETGqm1sNqB2AKrAaqbMuHOFY9Tj8vGr5Hv8gmNjWrFK4l9GIat2Q4ud7hGgfQFHGdH5DZMQ3ygqrD+HhxwHGOv9+2JdOnf1DjHJr5pNMBJ6HMLSbFxtWZi5klXUQlr0MK08GQlRTCAlCB5GKRhX4PFbiahiEbAf6BYzuVmiakmIpX1DgYjkU0LpThr2GXjGGjm3Vemy/32Dodh2OAGf+AHInwfERqKVWMBJw1hXX9Z505mw/ufrnvUzea73ygpR7o0DjoKpigGqsOkkhq6Rgk3/4uavYo+Kwaxp6zuoRGNQYqz+VdanOesz9dLvm99ffkVct/JxlijMl+0KuMlvmZBnc07EuqBSC5PiE7cyoWQAZb/uwmZanbVdTrp4e+6YgrTTpPjOSFjYX+cDVzcm0dGhyUT+KN7mh+I+ljoTCl7y18kUqhtWAHsd2UABpVZoEDvT+fcsUfHprjq/1us3IfZXGjhWGcSFLJ0iH7a9lUw8QmIuWGt5Tz61YfZY3LKiB39fsmpXzmtsuRy5aREGXztHk71mZxPy8qR6E6t6vZQY5ShG21nZokblLgy5ndhOWYRiwAP4eKhtdiss3YFrnLPHfru40Piuuqe82ToRJzq3wnukZWvbhUosgIONSQavIR+KR8CaI' \
  -H 'bx-umidtoken: T2gAPgZWox2swbyGJkHo5go0dwKKt3iFwUR1BRZ0jqZOYTL3OvpHaWkY4F8-zAkiNKc=' \
  -H 'bx-v: 2.5.28' \
  -H 'content-type: application/json' \
  -H 'sec-ch-ua: "Chromium";v="136", "Google Chrome";v="136", "Not.A/Brand";v="99"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "Windows"' \
  -H 'source: web' \
  -H 'x-request-id: 4266029c-81be-4b92-a0d1-d199738f03fd'
  
*/

export default function pastehandler({
	e,
	setValue,
	trigger,
	remove,
	append,
	resetField,
}) {
	e.preventDefault();

	const pastedText = e.clipboardData.getData('text').trim();

	let parsedUrl;

	try {
		/* try to parse url */
		parsedUrl = new URL(pastedText);
		setValue('path', parsedUrl.pathname.substring(1));
		trigger('path');

		const queryParams = {};

		for (const [key, value] of parsedUrl.searchParams.entries()) {
			queryParams[key] = value;
		}

		const paramsArray = Object.entries(queryParams).map(([key, value]) => ({
			key,
			value,
		}));

		remove();
		if (paramsArray.length > 0) {
			append([...paramsArray]);
		}
		append([{ key: '', value: '' }]);
	} catch (_e) {
		/* try to parse curl */
		try {
			const parsedCurl = parseCurl(pastedText);

			setValue('method', parsedCurl.method || 'GET');
			trigger('method');
			const parsedUrl = new URL(parsedCurl.url);
			setValue('path', parsedUrl.pathname.substring(1));
			trigger('path');

			const queryParams = {};
			for (const [key, value] of parsedUrl.searchParams.entries()) {
				queryParams[key] = value;
			}
			const paramsArray = Object.entries(queryParams).map(
				([key, value]) => ({
					key,
					value,
				}),
			);
			remove();
			if (paramsArray.length > 0) {
				append([...paramsArray]);
			}
			append([{ key: '', value: '' }]);

			resetField('body');
			resetField('data');
			resetField('bodyType');
			// JSON
			if (parsedCurl.body) {
				setValue('bodyType', 'JSON');
				setValue('json', formatJson(parsedCurl.body));
			}

			// form-data / x-www-form-urlencoded
			if (parsedCurl.data) {
				setValue('bodyType', 'x-www-form-urlencoded');
				setValue('data', parsedCurl.data.join('&'));
				trigger('bodyType');
			}
		} catch (_e) {
			console.log(_e.message);
			/* do not parse */
			setValue('path', pastedText);
		}
	}
}
