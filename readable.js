module.exports = function factory(readable) {
	let exhausted = false;
	const onData = () => new Promise(resolve => {
		readable.once('readable', () => {
			resolve(readable.read());
		});
	});

	return {
		[asyncIterator]() {
			return this;
		},
		async next() {
			if (exhausted === true) {
				return {done: true};
			}
			const chunk = await onData();
			if (chunk === null) {
				exhausted = true;
				return this.next();
			}

			return {done:false,value:chunk};
		},
		return() {
			if (!exhausted) {
				readable.close();
			}
		}
	};
};