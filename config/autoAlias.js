import { resolve } from 'path';
import { readdirSync } from 'fs';

const srcPath = resolve(__dirname, '../src');

const getFolders = (srcPath) => {
	return readdirSync(srcPath, { withFileTypes: true })
		.filter((dirent) => dirent.isDirectory())
		.map((dirent) => dirent.name);
};

const folders = getFolders(srcPath);
const aliases = folders.reduce((aliases, folder) => {
	aliases[folder] = resolve(srcPath, folder);
	return aliases;
}, {});

export default aliases;
