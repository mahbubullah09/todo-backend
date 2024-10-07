import bcrypt from "bcryptjs/dist/bcrypt";
import mongoose from "mongoose";



const userSchema = new mongoose.Schema({

    name:{
        type:String,
        require: true,
    },
    email:{
        type: String,
        require: true,
        unique: true,
    },
    password:{
        type: String,
        require: true,
    },
    role:{
        type:String,
        enum:['user, admin'],
        require: true,
        default: "user"
    }
})

// hash function for the password 

userSchema.pre('save', async (next)=>{
    if (!this.isModified('password')) {
        return next();
      }

      this.password = await bcrypt.hash(this.password, 10)
      next()
})

export default mongoose.model("User", userSchema)