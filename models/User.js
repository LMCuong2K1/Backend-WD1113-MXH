const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const bcrypt = require('bcryptjs');
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        select: false,
        minlength: 6
    },
    role: {
        type: String,
        enum: ['User', 'Admin'],
        default: 'User'
    },
    avatar: {
        type: String,
        default: ''
    }
},
    { timestamps: true }
);
UserSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.matchPassword = async function (enteredPass) {
    return bcrypt.compare(enteredPass, this.password);
};
UserSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    return user;
}

UserSchema.plugin(mongooseDelete, { deletedAt: true, deletedBy: true, overrideMethods: true });
const User = mongoose.model('User', UserSchema);

module.exports = User;