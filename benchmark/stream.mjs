import fs from 'fs';

const writable = fs.createWriteStream('./benchmark/copiedStream.txt');
const readable = fs.createReadStream('./benchmark/fixture.txt');

readable.pipe(writable);