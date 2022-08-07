const mongoose = require("mongoose");

const UserShema = new mongoose.Schema(
  {
    fullname:{type:String},
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    address:{type:String},
    phone:{type:Number},
    gender:{type:String},
    active:{type:Boolean,default:false},
    isAdmin: { type: Boolean, default: false },
    img: { type: String,default:"https://i.ibb.co/YZC6n90/coat1.png" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserShema);
