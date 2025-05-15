const http = require('http');
const fs = require('fs');
const {pipeline, Transform} = require('stream');

const replaceWordProcessor = require('./replaceWordProcessor');
const uppercaseWordProcessor = require('./uppercaseWordProcessor');

const server = http.createServer((req, res) => {
    if (req.url !== '/') {
        return res.end();
    }
    
    // Downloading big file bad way
    // const file = fs.readFileSync('sample.txt', 'utf-8');
    // return res.end(file);

    // Downloading big file using good way (streams)
    // const readableStream =  fs.createReadStream('sample.txt');
    // readableStream -> writableStream (using pipe)
    // 'res' object is a writableStream in nodeJs
    // readableStream.pipe(res);

    // copy big file using bad way
    // const file = fs.readFileSync('sample.txt');
    // fs.writeFileSync('plain.txt', file);
    // res.end();


    // copy bif file using good way
    // const readStream = fs.createReadStream('sample.txt');
    // const writeStream = fs.createWriteStream('output.txt');

    // readStream.on('data', (chunk) => {
    //     console.log('chunk: ', chunk);
    //     writeStream.write(chunk);
    // })
    // res.end();

    // String processing
    const sampleFileStream = fs.createReadStream('sample.txt');
    const outputWritableStream = fs.createWriteStream('output.txt');

    pipeline(
      sampleFileStream,
      replaceWordProcessor,
      uppercaseWordProcessor,
      outputWritableStream,
      (err) => {
        if (err) {
          console.log('Error handling here....', err);
        }
      }
    );


    // sampleFileStream.on('data', (chunk) => {
    //     console.log('data received: ', chunk.toString());

    //     // process
    //     const finalString = chunk.toString().replaceAll(/ipsum/gi, 'cool').toUpperCase();

    //     // write into writable stream
    //     outputWritableStream.write(finalString);
    // });


    // sampleFileStream
    //     .pipe(replaceWordProcessor)
    //     .on('error', (err) => { console.log(err) })
    //     .pipe(uppercaseWordProcessor)
    //     .on('error', (err) => { console.log(err) })
    //     .pipe(outputWritableStream)
    //     .on('error', (err) => { console.log(err) });       



    res.end();
})


const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));