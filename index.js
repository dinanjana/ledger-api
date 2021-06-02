const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const app = require('./src/app');

/**
 * Enabling clusters for multi processor enviornments
*/
const startCluster = () => {
    if (cluster.isMaster) {
        console.log(`Master ${process.pid} is running`);
      
        // Fork workers.
        for (let i = 0; i < numCPUs; i++) {
          cluster.fork();
        }
      
        cluster.on('exit', (worker) => {
          console.log(`worker ${worker.process.pid} died`);
        });
      } else { 
        // Workers starting servers per worker
        app.start(app.init());
        console.log(`Worker ${process.pid} started`);
      }
};
process.env.CLUSTERING_ENABLED ? startCluster() : app.start(app.init());
