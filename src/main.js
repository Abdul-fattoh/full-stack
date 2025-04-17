import app from './app.js';

import {config} from './config/index.js';
import {connectionDB} from './db/index.js';

async function startServer() {
    try {
        await connectionDB();
        app.listen(config.api.port, () => {
            console.log(`Server is running on port ${config.api.port}`);
        });
    } catch (error) {
        console.error('Exit:', error.message);
        process.exit(1);
    }
}
startServer();