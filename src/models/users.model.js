const bcrypt = require('bcryptjs');
const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile_photo_url: { type: String, required: true },
    roles: { type: String, required: true },
},
{
    versionKey: false,
    timestamps: true
});

userSchema.pre("save", function (next) {
    if(!this.isModified("password")) return next();

    const hash = bcrypt.hash(this.password, 10, (err, hash) => {
        this.password = hash;
        return next();
    });
    
    // bcrypt.genSalt(10, function(err, salt) {
    //     bcrypt.hash(this.password, salt, function(err, hash) {
    //         this.password = hash;
    //         return next();
    //     });
    });

module.exports = model("user", userSchema);