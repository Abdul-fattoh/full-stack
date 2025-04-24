export const config = {
    api: {
        port: process.env.PORT || 5000
    },
    db: {
        mongoDbUrl: process.env.MONGODB_URL
    },
    nodeEnv: process.env.NODE_ENV,
}