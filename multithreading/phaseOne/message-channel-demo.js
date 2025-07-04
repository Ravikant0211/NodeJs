import { Worker, MessageChannel, isMainThread, parentPort } from 'worker_threads';

if (isMainThread) {
    const { port1, port2 } = new MessageChannel();
    const worker = new Worker(new URL(import.meta.url));
    worker.postMessage({ port: port2 }, [port2]);
    port1.on('message', (msg) => console.log(`Main thread received:`, msg));
} else {
    parentPort.once('message', ({ port }) => {
        port.postMessage(`Hello from worker using MessageChannel!`);
    })
}