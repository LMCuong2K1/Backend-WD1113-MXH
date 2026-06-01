const dotenv = require('dotenv');
const db = require('./config/db');
dotenv.config();
const app = require('./app');

const connectDB = () => {
    return db.main();
};
const connectPort = process.env.PORT || 3000;
const startServer = async () => {
    await connectDB();
    app.listen(connectPort, async () => {
        console.log('Server Backend đã bla bla bla... ở cổng ' + connectPort);
    });
};


startServer().catch(err => {
    console.log(err);
    process.exit(1);
});