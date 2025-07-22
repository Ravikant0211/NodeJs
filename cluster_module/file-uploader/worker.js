import express from 'express';

import App from './services/expressApp.js';

export default async function startWorker () {
    const app = express();

    await App(app);

    app.listen(8000, () => {
        console.log(`Server is runnign on port 8000`)
    });
}