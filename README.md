[![CircleCI](https://circleci.com/gh/lorenzofox3/for-await-node.svg?style=svg)](https://circleci.com/gh/lorenzofox3/for-await-node)

# for-await-node
Turn various nodejs data structures into asynIterators

## Installation

npm install @lorenzofox3/for-await-node

## Usage

1. Readable stream

```Javascript
import {fromReadable} from '@lorenzofox3/for-await-node';
import fs from 'fs';

const readable = fs.createReadStream('path/To/File');

(async function(){
  for await (const chunk of fromReadable(readable)){
     console.log(chunk;
  }
})();
```


