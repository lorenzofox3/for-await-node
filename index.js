'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
const fromReadable = exports.fromReadable = async function* (readable) {
	let exhausted = false;
	const onData = () => new Promise(resolve => {
		readable.once('readable', () => {
			resolve(readable.read());
		});
	});

	try {
		while (true) {
			const chunk = await onData();
			if (chunk === null) {
				exhausted = true;
				break;
			}
			yield chunk;
		}
	} finally {
		if (!exhausted) {
			readable.close();
		}
	}
};