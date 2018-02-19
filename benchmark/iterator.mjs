import {fromReadable} from "../index.mjs";
import fs from 'fs';

(async function () {
	const writable = fs.createWriteStream('./benchmark/copiedIterator.txt');
	for await (const chunk of fromReadable(fs.createReadStream('./benchmark/fixture.txt'))) {
		writable.write(chunk);
	}
	writable.end();
})();