import {fromReadable} from "../index.mjs";
import fs from 'fs';
import test from 'zora';

const wait = time => new Promise(resolve => {
	setTimeout(() => resolve(), time);
});

test('iterate over a readable stream to the end', async t => {
	let closed = false;
	const result = [];
	let readable = fs.createReadStream('./test/fixture.txt', {
		encoding: 'utf8',
		highWaterMark: 13
	});

	readable.on('close', () => closed = true);

	for await (const item of fromReadable(readable)) {
		result.push(item);
	}

	t.equal(result.length, 10, 'should have seen 13 iterations');
	t.deepEqual(result, [
		'hello world!\n',
		'hello world!\n',
		'hello world!\n',
		'hello world!\n',
		'hello world!\n',
		'hello world!\n',
		'hello world!\n',
		'hello world!\n',
		'hello world!\n',
		'hello world!\n'
	]);

	await wait(10); // Wait next tick

	t.equal(closed, true, 'stream should have been closed');
});


test('iterate over a stream before it reaches the end', async t => {
	let closed = false;
	const result = [];
	let readable = fs.createReadStream('./test/fixture.txt', {
		encoding: 'utf8',
		highWaterMark: 13
	});
	readable.on('close', () => closed = true);
	let i = 0;
	for await (const item of fromReadable(readable)) {
		if (i > 4) {
			break;
		}
		result.push(item);
		i++;
	}

	t.equal(result.length, 5, 'should have seen 13 iterations');
	t.deepEqual(result, [
		'hello world!\n',
		'hello world!\n',
		'hello world!\n',
		'hello world!\n',
		'hello world!\n',
	]);

	await wait(10); // Wait next tick

	t.equal(closed, true, 'stream should have been closed');
});