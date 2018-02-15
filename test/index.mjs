import {fromReadable} from "../index.mjs";
import fs from 'fs';

(async function () {
	for await (const item of fromReadable(fs.createReadStream('./test/fixture.txt', {encoding: 'utf8'}))) {
		console.log(item);
	}
})();
