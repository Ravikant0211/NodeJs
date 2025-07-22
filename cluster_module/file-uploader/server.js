import cluster from "cluster";
import { availableParallelism } from 'os';
import process from 'process';

import startWorker from "./worker.js";

const numOfCpus = availableParallelism();

if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);

    // fork workers
    for (let i = 0; i < numOfCpus; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
    });

} else {
    // Workers can share any TCP connection
    // In this case it is an HTTP server
    await startWorker();
    console.log(`Worker ${process.pid} started`);
}   

