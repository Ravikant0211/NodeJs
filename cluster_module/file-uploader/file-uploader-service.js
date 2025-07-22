import { createWriteStream, createReadStream } from 'fs';
import process from 'process';

export const FileUploaderService = async (req, res, next) => {
    console.log('Request: ', req.file.path);

    const readFileStream = createReadStream(req.file.path);
    const writeFileStream = createWriteStream('./writtenFiles');

    readFileStream.pipe(writeFileStream);

    writeFileStream.on('finish', () => {
        console.log(`File uploaded by worker ${process.pid}`);
        return res.status(200).json({
            message: 'File uploaded successfully'
        })
    })

    writeFileStream.on('error', (err) => {
        // Do all the cleanup work- delete files that are uploaded
        return res.status(500).json({
            message: err.message
        });
    })
}