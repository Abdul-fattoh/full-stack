import app from './app.js';
import { connectDB } from "./db/index.js";

function startServer() {
    try {
        const PORT = process.env.PORT || 5000;
        connectDB();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Exit:", error.message);
        process.exit(1);
    }
}

startServer();