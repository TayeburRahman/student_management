const mongoose = require('mongoose')
let validator = require("validator");
let bcrypt = require("bcryptjs");


// model step: 1
const adminModel = new mongoose.Schema(
        {
            displayName: {
                type: String, 
                trim: true,
            },
            email: {
                type: String,
                trim: true,
                lowercase: true,
                unique: true,
                validate:[validator.isEmail, "Provided email is not valid."],
                required:[true, "Email address is require"]
            },
            password: {
                type: String, 
                required: [true, "Password is required"],
                validate:{
                    validator: (value)=>
                        validator.isStrongPassword(value,{
                            minLength:6,
                            minLowercase:3,
                            minNumbers:1,
                            minUppercase:1
                        }),
                        message: "Password is not strong enough, Follow This - [ MinLength:6, MinNumbers:1, MinUppercase:1 ]", 
                },
            },
            confirmPassword:{
                type:String,
                required: [true, "please confirm your password"],
                validate:{
                    validator: function (value) {
                        return value === this.password;
                    }, 
                    message: "Password not match", 
                } 
            },
            role:{
                type:String,
                enum:["admin", "author","teacher"],
                default: "author"
            }, 
            imageURL: {
                type: String,
                validate:[validator.isURL, "Provided image URL is not valid."], 
            },
            department: {
                type: String,
                enum:["cse", "eee","civil","bba"],
            },
            status:{
                type: String,
                default:"active",
                enum:["active", "inactive"]
            },
            passwordChangeAt:Date,
            passwordRestToken:String,
            passwordTokenExpires:Date, 
        },
        {
             timestamps: true, 
        }
    );

// Password hash by bcrypt 
    adminModel.pre("save", function (next) {
        const password= this.password;

        const hashPassword = bcrypt.hashSync(password);

        this.password = hashPassword;
        this.confirmPassword = undefined;

        next();
    })
     
module.exports = mongoose.model('admins', adminModel)