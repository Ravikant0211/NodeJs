const {Readable, Writable} = require('stream');

const readableStream = new Readable({
    objectMode: true,
    highWaterMark: 0,
    read: function() {}
});

// const writableStream = new Writable({
//     write: function(s) {
//         console.log('writing: ', s.toString());
//     }
// });

readableStream.on('data', (chunk) => {
    console.log('Data coming: ', chunk);
    // writableStream.write(chunk);
})

// console.log(readableStream.push('Hello from India!'));
console.log(readableStream.push({
    name: "Ravi"
}))