export const config = {
    api: {
        port : process.env.PORT || 5000,
    },
    db: {
        url: process.env.DB_URL || 'mongodb://localhost:27017/',
    },
    nodeEnv: process.env.NODE_ENV || 'development',
}