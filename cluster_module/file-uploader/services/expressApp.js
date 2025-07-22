import express from 'express';

import { FileUpload } from '../middlewares/index.js';
import { FileUploaderService } from '../file-uploader-service.js';


export default async (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.post('/file', FileUpload, FileUploaderService);
}