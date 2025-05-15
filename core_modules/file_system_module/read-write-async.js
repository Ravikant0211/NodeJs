const fs = require('fs');

// Asynchronously writes data to a file, replacing the file if it already exists.
// This method doesn't return anything
fs.writeFile("read.txt", "Today is awesome day :)", (err) => {
    if (err) throw err;
    console.log('File is created successfully.')
});

// Asynchronously append data to a file, creating the file if it does not yet exist. 
fs.appendFile("read.txt", " I want to go for a ride.", (err) => {
    if (err) throw err;
    console.log("File written successfully.");
});


// Used 'setTimeOut' just to allow the thread to write file properly before reading it.
setTimeout(() => {
    fs.readFile("read.txt", 'utf8', (err, data) => {
        if (err) throw err;
        console.log(data);
    })
}, 1000);