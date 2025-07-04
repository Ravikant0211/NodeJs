import { Worker, isMainThread, workerData, parentPort } from 'worker_threads';

if (isMainThread) {
    // console.log('import.meta.url >> ', new URL(import.meta.url));
    const worker = new Worker(new URL(import.meta.url), {
        workerData: 'Ravi kant'
    });
    worker.on('message', (msg) => console.log(`Main thread received: ${msg}`));
    worker.on('error', (err) => console.log(err));
    worker.on('exit', (code) => console.log(`Worker exited with code ${code}`));
} else {
    const name = workerData;
    parentPort.postMessage(`Hello from worker, ${name}!`);
    // throw new Error('Something went wrong in worker!');
}