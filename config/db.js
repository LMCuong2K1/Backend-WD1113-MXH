const mongoose = require('mongoose');
main().catch(err => console.log(err));

module.exports = {
    main: async () => {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Bla bla MongoDB thành công!");
    }
}