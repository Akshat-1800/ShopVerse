import mongoose from "mongoose";
 
const userSchema = new mongoose.Schema(
  {
    
    email: {
        type: String,
        required: true,},
    password: {
        type: String,
        required: true,},
    role: {
        type: String,
        enum: ['customer', 'seller', 'admin'],
        default: 'customer',
        required: true,},
        recentlyOrderedProducts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        }],
        recentlyListedProducts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        }],
        name: {
            type: String,
        },
        phone: {
            type: String,
            maxlength: 13,
        },
        address: {
            type: String,
        },
        
    },
  { timestamps: true }
);
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;