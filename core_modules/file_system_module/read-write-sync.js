const fs = require('fs');

// writes a new file synchronously, if file is not present it creates a new file, otherwise delete the old
// data from the file and writes new data.
fs.writeFileSync("read.txt", "Hello world!");

// fs.writeFileSync("read.txt", "My name is Ravi kant");

// To append new data inside the same file
fs.appendFileSync("read.txt", " My name is Ravi kant");

// Node.js includes an additional data type called Buffer.
// (Not available in browsers' javascript)
// Buffer is mainly used to store binary data, while reading from a file or receiving packets over the network.
const buf_data = fs.readFileSync("read.txt");
console.log(buf_data); 
// <Buffer 48 65 6c 6c 6f 20 77 6f 72 6c 64 21 20 4d 79 20 6e 61 6d 65 20 69 73 20 52 61 76 69 20 6b 61 6e 74>
const org_data = buf_data.toString();
console.log(org_data); // Hello world! My name is Ravi kant

// To rename a file
fs.renameSync("read.txt", "read-write.txt");

