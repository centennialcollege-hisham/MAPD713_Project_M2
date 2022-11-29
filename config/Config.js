module.exports = {
    ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 8002,
    URL: process.env.BASE_URL || 'http://localhost:8002',
    MONGODB_URI: process.env.MONGODB_URI ||
        'mongodb+srv://hisham_group11:group11hisham@cluster0.imvf1.mongodb.net/patient_app?retryWrites=true&w=majority'
}