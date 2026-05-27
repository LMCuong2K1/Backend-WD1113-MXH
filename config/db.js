const mongoose = require('mongoose');

module.exports = {
    main: async () => {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Bla bla MongoDB thành công!");
    }
}