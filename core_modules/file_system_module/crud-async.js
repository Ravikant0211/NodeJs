const fs = require('fs');

fs.mkdir('test', (err) => {
    if (err) throw err;
    console.log('Directory created successfully.');

    fs.writeFile('test/bio.txt', 'My name is Ravi kant.', 'utf-8', (err) => {
        if (err) throw err;
        console.log("File written successfully.");

        fs.appendFile('test/bio.txt', ' I am a software engineer. I live in Aligarh, Uttar Pradesh.', 'utf-8', (err) => {
            if (err) throw err;
            console.log('File data appended successfully.');

            fs.readFile('test/bio.txt', 'utf-8', (err, data) => {
                if (err) throw err;
                console.log(data);

                fs.rename('test/bio.txt', 'test/myBio.txt', (err) => {
                    if (err) throw err;
                    console.log('File renamed successfully.');

                    fs.unlink('test/myBio.txt', (err) => {
                        if (err) throw err;
                        console.log('File delete successfully.');

                        fs.rmdir('test', (err) => {
                            if (err) throw err;
                            console.log('Directory delete successfully.');
                        })
                    })
                })
            });
        });
    });
});