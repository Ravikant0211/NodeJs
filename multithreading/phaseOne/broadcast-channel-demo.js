import { Worker, BroadcastChannel, isMainThread, workerData } from 'worker_threads';

const broadcastChannel = new BroadcastChannel('Broadcast-channel-demo');

if (isMainThread) {
    let counter = 0;

    // Main thread listens to messages from all workers
    broadcastChannel.onmessage = (event) => {
        console.log(`Main thread received: ${JSON.stringify(event.data, null, 2)}`);
        if (++counter === 3) broadcastChannel.close();
    };

    // Spawn 3 workers
    for (let i = 0; i < 3; i++) {
        new Worker(new URL(import.meta.url), { workerData: { id: i + 1 }});
    }
} else {
    // worker sends a message to the BroadcastChannel
    const workerId = workerData.id;
    const timeStamp = new Date();
    broadcastChannel.postMessage({ id: workerId, message: `Hello from worker ${workerId}`, timeStamp });
    broadcastChannel.close();
}