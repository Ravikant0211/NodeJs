const fs = require('fs');

// const writableStream = fs.createWriteStream('log.txt');

// process.stdin.pipe(writableStream);

// 'process.stdin' is a readable stream in nodejs.


const readableStream = fs.createReadStream('log.txt');

readableStream.pipe(process.stdout);