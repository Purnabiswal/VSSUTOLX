import http from 'node:http';
import 'dotenv/config';
import app from './app.js';
import connectDatabase from './config/db.js';
import { initSocket } from './socket/index.js';


const port = process.env.PORT || 5000;
const server = http.createServer(app);

await connectDatabase();
initSocket(server);

server.listen(port, () => {
  console.log(`VSSUT OLX API running on port ${port}`);
});

const shutdown = (signal) => {
  console.log(`${signal} received. Closing server.`);
  server.close(() => process.exit(0));
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
