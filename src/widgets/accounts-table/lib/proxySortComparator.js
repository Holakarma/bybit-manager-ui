const proxySortComparator = (v1, v2) => {
	const host1 = v1.proxy?.host || '';
	const host2 = v2.proxy?.host || '';

	return host1.localeCompare(host2);
};

export default proxySortComparator;
